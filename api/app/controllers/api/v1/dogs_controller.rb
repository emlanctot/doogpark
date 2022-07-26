require 'pry'
class Api::V1::DogsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
        @dogs = Dog.all.with_attached_image.map{|d| DogSerializer.new(d).serializable_hash[:data][:attributes]}
        render json: @dogs
    end

    def show
        @dog = Dog.find(params[:id])
        render json: DogSerializer.new(@dog).serializable_hash[:data][:attributes]
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
