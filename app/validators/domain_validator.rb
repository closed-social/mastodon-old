# frozen_string_literal: true

class DomainValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?

<<<<<<< HEAD
    domain = begin
      if options[:acct]
        value.split('@').last
      else
        value
      end
    end

    record.errors.add(attribute, I18n.t('domain_validator.invalid_domain')) unless compliant?(domain)
=======
    record.errors.add(attribute, I18n.t('domain_validator.invalid_domain')) unless compliant?(value)
>>>>>>> closed-social
  end

  private

  def compliant?(value)
    Addressable::URI.new.tap { |uri| uri.host = value }
<<<<<<< HEAD
  rescue Addressable::URI::InvalidURIError, IDN::Idna::IdnaError
=======
  rescue Addressable::URI::InvalidURIError
>>>>>>> closed-social
    false
  end
end
