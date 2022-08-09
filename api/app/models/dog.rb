class Dog < ApplicationRecord
    has_many :states
    has_one_attached :image, :dependent => :destroy

    validates :name, presence: true, uniqueness: true
    validates :pattern, presence: true
    after_save :define_new_dog
    
    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

    def define_new_dog
        # place dog in middle of park
        self.x ||= 12.0
        self.y ||= 6.0
        intial_state = self.states.new(start_time: Time.now, end_time: Time.now + 1.minutes, state: :standing)
        walk_state = self.states.new(start_time: Time.now, targets: [{x: (self.x + 12.0), y: self.y}], state: :walking)
        intial_state.save!
        walk_state.save!
        # when a new dog is created the dog sits for 1 minute then gets a new random state
        # set a days worth of state for that dog
    end

end
