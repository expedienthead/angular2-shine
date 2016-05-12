class AddSearchingIndexesToCustomers < ActiveRecord::Migration
  def up
    execute %{
      CREATE INDEX
        customers_last_name
      ON
        customers (last_name)
    }
    execute %{
      CREATE INDEX
        customers_first_name
      ON
        customers (first_name)
    }
    execute %{
      CREATE INDEX
        customers_email
      ON
        customers (email)
    }
  end

  def down
    remove_index :customers, name: 'customers_last_name'
    remove_index :customers, name: 'customers_first_name'
    remove_index :customers, name: 'customers_email'
  end
end
