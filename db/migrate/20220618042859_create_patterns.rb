class CreatePatterns < ActiveRecord::Migration[7.0]
  def change
    create_table :patterns do |t|
      t.string :front, array: true, default: []
      t.string :back, array: true, default: []
      t.string :right, array: true, default: []
      t.string :left, array: true, default: []
      t.references :dog, null: false, foreign_key: true

      t.timestamps
    end
  end
end
