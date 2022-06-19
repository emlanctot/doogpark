class PatternsController < ApplicationController

    def index
        @patterns = Patterns.all
        render json: @patterns
    end

    def create
        @pattern = Pattern.new(post_params)
        if @pattern
            @pattern.save
        end
    end

private

    def post_params
        params.require(:pattern).permit(:front, :back, :left, :right, :dog)
    end
end

