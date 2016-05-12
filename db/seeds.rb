# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
100.times do |i|
  Customer.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    username: "#{Faker::Internet.user_name}#{i}",
    email: Faker::Internet.user_name + i.to_s + "@#{Faker::Internet.domain_name}"
  )
end

# Create sample states in the US
State.create!(name: "Arizona",       code: "AZ")
State.create!(name: "California",    code: "CA")
State.create!(name: "Delaware",      code: "DE")
State.create!(name: "Florida",       code: "FL")
State.create!(name: "Hawaii",        code: "HI")
State.create!(name: "Illinois",      code: "IL")
State.create!(name: "Massachusetts", code: "MA")
State.create!(name: "New York",      code: "NY")
State.create!(name: "Pennsylvania",  code: "PA")
State.create!(name: "Tennessee",     code: "TN")
State.create!(name: "Utah",          code: "UT")
State.create!(name: "Washington",    code: "WA")

# Helper method to create a shipping address for a customer
def create_shipping_address(customer_id, num_states, is_primary)
  shipping_state = State.all[rand(num_states)]
  shipping_address = Address.create!(
    street: Faker::Address.street_address,
    city: Faker::Address.city,
    state: shipping_state,
    zipcode: Faker::Address.zip
  )
  CustomersShippingAddress.create!(customer_id: customer_id,
                                   address: shipping_address,
                                   primary: is_primary)
end

# Cache the number of states so we don't have to query
# each time through
num_states = State.all.count

# For all customers
Customer.all.pluck(:id).each do |customer_id|
  # Create a random number of shipping addresses, making
  # sure we create at least 1
  num_shipping_addresses = rand(4) + 1

  num_shipping_addresses.times do |i|
    # Create the shipping address, setting the first one
    # we create as the "primary"
    create_shipping_address(customer_id, num_states, i == 0)
  end
end
