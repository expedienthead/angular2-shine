class CustomerController < ApplicationController
  PAGE_SIZE = 20
  def index
    #binding.pry
    @page = (params[:page] || 0).to_i
    if params[:keywords].present?
      @keywords = params[:keywords]
      customer_search_term = CustomerSearchTerm.new(@keywords)
      @customers = Customer.where(
        customer_search_term.where_clause,
        customer_search_term.where_args)
                           .order(customer_search_term.order)
                           .offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
    else
      @customers = Customer.all
                           .order('lower(email) desc, last_name asc')
                           .offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
    end
    respond_to do |format|
      format.html {}
      format.json { render json: @customers }
    end
  end

  def show
    customer = CustomerDetail.find(params[:id])
    respond_to do |format|
      format.html {}
      format.json { render json: customer }
    end
  end

  def update
    customer_details = CustomerDetail.find(params[:id])
    customer_details.update(customer_params)
    render :show
  end

  private

  def customer_params
    request.body.rewind
    ActionController::Parameters
      .new(JSON.parse(request.body.read || '{"customer: "Not given"}'))
      .require(:customer)
  end
end
