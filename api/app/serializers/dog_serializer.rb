class DogSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :x, :y, :facing, :pattern, :image, :created_at, :updated_at, :image_url
end
