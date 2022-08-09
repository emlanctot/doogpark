class CreateStates < ActiveRecord::Migration[7.0]
  def change
    create_table :states do |t|
      t.time :start_time
      t.time :end_time
      t.string :targets, default: [], array: true
      t.integer :state, default: 0
      t.references :dog, foreign_key: true

      t.timestamps
    end
  end
end
