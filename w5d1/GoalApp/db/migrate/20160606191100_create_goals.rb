class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
