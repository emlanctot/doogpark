namespace :doog do
  desc "Update doogs states for the day"
  task update_states: :environment do
    puts "What are the doogs doing?"

    # this is now going to set all the states for dogs for 24 hours

    # dogs = Dog.all
    # query for dogs whose expirations are past due
    # iterate thru each of those dogs and randomly update state/expiration/destination
    
  
  end

end

# crontab -e
# * * * * * cd /Users/emmalanctot/projects/doogpark/api && /Users/emmalanctot/.rbenv/shims/rake RAILS_ENV=production doog:check_state