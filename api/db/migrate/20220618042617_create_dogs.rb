class CreateDogs < ActiveRecord::Migration[7.0]
  def change
    create_table :dogs do |t|
      t.string :name
      t.float :x
      t.float :y
      t.integer :facing

      t.timestamps
    end
  end
end
