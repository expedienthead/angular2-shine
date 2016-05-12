class Customer < ActiveRecord::Base
  has_many :customers_shipping_address

  def primary_shipping_address
    customers_shipping_address.find_by(primary: true).address
  end
end
