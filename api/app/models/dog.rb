class Dog < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :pattern, presence: true
end
