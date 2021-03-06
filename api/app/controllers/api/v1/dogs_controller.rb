require 'pry'
class Api::V1::DogsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
        @dogs = Dog.all
        render json: @dogs
    end

    def show
        @dog = Dog.find(params[:id])
        render json: @dog
    end
    
    def create
        dp = dog_params
        dp[:pattern] = JSON.parse(dog_params[:pattern])

        @dog = Dog.new(dp)
        if @dog.save
            render json: @dog
        else
            render json: { error: 'Ooops something went wrong!'}, status: 400
        end
    end

    def update
        @dog = Dog.find(params[:id])
        if @dog
            @dog.update(dog_params)
            render json: { message: "Dog updated!"}, status: 200
        else
            render error: { error: 'Ooops something went wrong!'}, status: 400
        end
    end

private
    def dog_params
        params.require(:dog).permit(:name, :x, :y, :facing, :image, :pattern)
    end
end
