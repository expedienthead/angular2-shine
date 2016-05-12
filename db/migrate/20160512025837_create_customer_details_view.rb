class CreateCustomerDetailsView < ActiveRecord::Migration
  def up
    execute %{
      CREATE OR REPLACE VIEW customer_details AS
        SELECT customers.id         AS customer_id,
               customers.first_name AS first_name,
               customers.last_name  AS last_name,
               customers.email      AS email,
               customers.username   AS username,
               customers.created_at AS joined_at,
               shipping_address.id  AS shipping_address_id,
               shipping_address.street AS shipping_street,
               shipping_address.city AS shipping_city,
               shipping_state.code AS shipping_state,
               shipping_address.zipcode AS shipping_zipcode
        FROM customers
        JOIN customers_shipping_addresses ON
             customers.id = customers_shipping_addresses.customer_id
             AND customers_shipping_addresses.primary = true
        JOIN addresses shipping_address ON
             shipping_address.id = customers_shipping_addresses.address_id
        JOIN states shipping_state ON
             shipping_address.state_id = shipping_state.id
    }
  end

  def down
    execute 'DROP VIEW customer_details'
  end
end
