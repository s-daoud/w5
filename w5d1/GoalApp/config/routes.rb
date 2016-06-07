Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resources :goals, only: [:show]
  end
  resources :goals, except: [:show] do
  end
  resource :session, only: [:new, :create, :destroy]
  resources :comments, only: [:create]
  resources :cheers, only: [:index, :create]
end
