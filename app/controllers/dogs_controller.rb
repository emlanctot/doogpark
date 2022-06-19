class DogsController < ApplicationController

    def index
        @dogs = Dog.all
        render json: @dogs
    end

    def create

    end

    def update
        @dog = Dog.find_by(id: params[:id])
        if @post
            @post.update(post_params)
        end
    end

private

    def post_params
        params.require(:dog).permit(:name, :x, :y, :facing)
    end
end
