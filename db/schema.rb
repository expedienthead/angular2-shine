# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160512025837) do

  create_table "addresses", force: :cascade do |t|
    t.string  "street",   limit: 255, null: false
    t.string  "city",     limit: 255, null: false
    t.integer "state_id", limit: 4,   null: false
    t.string  "zipcode",  limit: 255, null: false
  end

  create_table "customer_details", id: false, force: :cascade do |t|
    t.integer  "customer_id",         limit: 4,   default: 0, null: false
    t.string   "first_name",          limit: 255,             null: false
    t.string   "last_name",           limit: 255,             null: false
    t.string   "email",               limit: 255,             null: false
    t.string   "username",            limit: 255,             null: false
    t.datetime "joined_at",                                   null: false
    t.integer  "shipping_address_id", limit: 4,   default: 0, null: false
    t.string   "shipping_street",     limit: 255,             null: false
    t.string   "shipping_city",       limit: 255,             null: false
    t.string   "shipping_state",      limit: 255,             null: false
    t.string   "shipping_zipcode",    limit: 255,             null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string   "first_name", limit: 255, null: false
    t.string   "last_name",  limit: 255, null: false
    t.string   "email",      limit: 255, null: false
    t.string   "username",   limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "customers", ["email"], name: "customers_email", using: :btree
  add_index "customers", ["email"], name: "index_customers_on_email", unique: true, using: :btree
  add_index "customers", ["first_name"], name: "customers_first_name", using: :btree
  add_index "customers", ["last_name"], name: "customers_last_name", using: :btree
  add_index "customers", ["username"], name: "index_customers_on_username", unique: true, using: :btree

  create_table "customers_shipping_addresses", force: :cascade do |t|
    t.integer "customer_id", limit: 4,                 null: false
    t.integer "address_id",  limit: 4,                 null: false
    t.boolean "primary",               default: false, null: false
  end

  create_table "states", force: :cascade do |t|
    t.string "code", limit: 255, null: false
    t.string "name", limit: 255, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
