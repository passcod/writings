require "bundler/setup"
require "sinatra"

require "erubis"
require "rdiscount"

configure do
  set :environment, (ENV['RACK_ENV'] || :development).to_sym
  
  ['revenge'].each { |book|
    text = []
    list = IO.read "views/#{book}/display.list"
    list.split("\n").each { |file|
      text.push IO.read "views/#{book}/#{file}"
    }
    File.open("views/#{book}.markdown", 'w') {|f| f.write(text.join "\n\n<hr/>\n\n") }
  }
end

get '/' do
  @title = "Home"
  @content = markdown :home, :layout => false
  @content.force_encoding "UTF-8"
  erb :layout
end

get '/Revenge' do
  @title = "Revenge"
  @content = markdown :revenge, :layout => false
  @content.force_encoding "UTF-8"
  erb :layout
end
