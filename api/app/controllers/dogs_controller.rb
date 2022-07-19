# require 'pry'
# # class Api::V1::DogsController < ApplicationController
# class DogsController < ApplicationController
#     skip_before_action :verify_authenticity_token
    
#     def index
#         @dogs = Dog.all
#         render json: @dogs
#     end
    
#     def show
#         @dog = Dog.find(params[:id])
#         @dog_sprite_a = Dog.dog_sprite_a(@dog.pattern)
#         @dog_sprite_b = Dog.dog_sprite_b(@dog.pattern)
#         @dog_sprite_c = Dog.dog_sprite_c(@dog.pattern)
#         @dog_sprite_d = Dog.dog_sprite_d(@dog.pattern)
#         @dog_sprite_e = Dog.dog_sprite_e(@dog.pattern)
#     end

#     def create_image
#         @dog = Dog.find(params[:id])
#         @dog_sprite_a = Dog.dog_sprite_a(@dog.pattern)
#         @dog_sprite_b = Dog.dog_sprite_b(@dog.pattern)
#         @dog_sprite_c = Dog.dog_sprite_c(@dog.pattern)
#         @dog_sprite_d = Dog.dog_sprite_d(@dog.pattern)
#         @dog_sprite_e = Dog.dog_sprite_e(@dog.pattern)
        
#         sprite_sheet = IMGKit.new('views/dogs/', :quality => 100)
#         img = kit.to_img(:png)
#     end
    
#     def create
#         # sprite_sheet = IMGKit.new()
#         # dog_params.pattern create the image from haml
#         @dog = Dog.find(params[:id])
#         @dog_sprite_a = Dog.dog_sprite_a(@dog.pattern)
#         @dog_sprite_b = Dog.dog_sprite_b(@dog.pattern)
#         @dog_sprite_c = Dog.dog_sprite_c(@dog.pattern)
#         @dog_sprite_d = Dog.dog_sprite_d(@dog.pattern)
#         @dog_sprite_e = Dog.dog_sprite_e(@dog.pattern)
        
#         debugger

#         sprite_sheet = IMGKit.new('views/dogs/', :quality => 100)
#         img = kit.to_img(:png)
        
#         @dog = Dog.new(dog_params)

#         if @dog.save
#             render json: @dog
#         else
#             render json: { error: 'Ooops something went wrong!'}, status: 400
#         end
#     end

#     def update
#         @dog = Dog.find(params[:id])
#         if @dog
#             @dog.update(dog_params)
#             render json: { message: "Dog updated!"}, status: 200
#         else
#             render json: { error: 'Ooops something went wrong!'}, status: 400
#         end
#     end

# private

#     def dog_params
#         params.require(:dog).permit(:id, :name, :x, :y, :facing, pattern: [], :sprite_image)
#     end
# end
