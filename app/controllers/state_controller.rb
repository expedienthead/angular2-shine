class StateController < ApplicationController
  def index
    @states = State.all.order('name')
    respond_to do |format|
      format.html {}
      format.json { render json: @states }
    end
  end
end
