class State < ApplicationRecord
  enum :state, { standing: 0, walking: 1 }, suffix: true, default: :standing #sitting, sniffing, digging, etc
  belongs_to :dog

  # states move to the next one either when their targets are completed or at the end_time



  
end