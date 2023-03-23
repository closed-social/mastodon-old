# frozen_string_literal: true

Rails.application.configure do
  config.x.email_default_domain = ENV.fetch('EMAIL_DEFAULT_DOMAIN', '')
  config.x.email_regex = ENV.fetch('EMAIL_REGEX', nil)
  config.x.anon.tag = ENV.fetch('ANON_TAG', '[mask]')
  config.x.anon.acc = ENV.fetch('ANON_ACC', nil)
  config.x.anon.namelist = ENV['ANON_NAME_LIST'] ? File.readlines(ENV['ANON_NAME_LIST']).collect(&:strip) : ['Alice', 'Bob', 'Carol', 'Dave']
  config.x.anon.salt = (1..42).map { ('a'..'z').to_a.sample }.join
end
