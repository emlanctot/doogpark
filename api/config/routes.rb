Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :dogs, controller: 'dogs'
    end
  end
end
