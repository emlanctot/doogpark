class Api::V1::StatesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def show

    end
    
    def create
        @state = State.create(state_params)
        if @state.save!
            render json: @state
        end
    end

    def destroy

    end

private
    def state_params
        params.require(:state).permit(:start_time, :end_time, :state, :dog_id)
    end
end
