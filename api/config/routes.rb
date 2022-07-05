Rails.application.routes.draw do
  resources :dogs, controller: 'dogs'
  namespace :api do
    namespace :v1 do
      resources :dogs, controller: 'dogs'
    end
  end
end
