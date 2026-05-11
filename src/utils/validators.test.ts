import { describe, it, expect } from 'vitest'
import {
  isEmail,
  isJaverianaDomain,
  normalizeName,
  isValidPhone,
  normalizePhone,
  hasMinLength,
} from './validators'

describe('validators', () => {
  describe('isEmail', () => {
    it('should validate correct email formats', () => {
      expect(isEmail('test@example.com')).toBe(true)
      expect(isEmail('user.name@domain.co')).toBe(true)
      expect(isEmail('user+tag@example.com')).toBe(true)
      expect(isEmail('test123@test-domain.com')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(isEmail('invalid')).toBe(false)
      expect(isEmail('invalid@')).toBe(false)
      expect(isEmail('@domain.com')).toBe(false)
      expect(isEmail('user@')).toBe(false)
      expect(isEmail('user @example.com')).toBe(false)
      expect(isEmail('')).toBe(false)
    })

    it('should handle emails with whitespace', () => {
      expect(isEmail('  test@example.com  ')).toBe(true)
      expect(isEmail(' invalid ')).toBe(false)
    })
  })

  describe('isJaverianaDomain', () => {
    it('should validate Javeriana institutional emails', () => {
      expect(isJaverianaDomain('estudiante@javeriana.edu.co')).toBe(true)
      expect(isJaverianaDomain('profesor@javeriana.edu.co')).toBe(true)
      expect(isJaverianaDomain('ADMIN@JAVERIANA.EDU.CO')).toBe(true)
    })

    it('should reject non-Javeriana emails', () => {
      expect(isJaverianaDomain('test@gmail.com')).toBe(false)
      expect(isJaverianaDomain('user@javeriana.com')).toBe(false)
      expect(isJaverianaDomain('user@otheruni.edu.co')).toBe(false)
      expect(isJaverianaDomain('')).toBe(false)
    })

    it('should be case insensitive', () => {
      expect(isJaverianaDomain('USER@Javeriana.EDU.co')).toBe(true)
      expect(isJaverianaDomain('user@JAVERIANA.edu.CO')).toBe(true)
    })

    it('should handle emails with whitespace', () => {
      expect(isJaverianaDomain('  user@javeriana.edu.co  ')).toBe(true)
    })
  })

  describe('normalizeName', () => {
    it('should capitalize each word', () => {
      expect(normalizeName('john doe')).toBe('John Doe')
      expect(normalizeName('MARIA GARCIA')).toBe('Maria Garcia')
      expect(normalizeName('pedro lópez')).toBe('Pedro López')
    })

    it('should handle names with tildes and accents', () => {
      expect(normalizeName('maría josé pérez')).toBe('María José Pérez')
      expect(normalizeName('josé antonio gutiérrez')).toBe('José Antonio Gutiérrez')
      expect(normalizeName('sofía lópez garcía')).toBe('Sofía López García')
    })

    it('should remove extra whitespace', () => {
      expect(normalizeName('john   doe')).toBe('John Doe')
      expect(normalizeName('  maria   garcia  ')).toBe('Maria Garcia')
      expect(normalizeName('pedro     lópez')).toBe('Pedro López')
    })

    it('should handle single names', () => {
      expect(normalizeName('madonna')).toBe('Madonna')
      expect(normalizeName('CHER')).toBe('Cher')
    })

    it('should handle empty strings', () => {
      expect(normalizeName('')).toBe('')
      expect(normalizeName('   ')).toBe('')
    })

    it('should handle names with hyphens', () => {
      expect(normalizeName('jean-claude')).toBe('Jean-claude')
      expect(normalizeName('mary-ann smith')).toBe('Mary-ann Smith')
    })

    it('should handle composite surnames', () => {
      expect(normalizeName('juan de la cruz')).toBe('Juan De La Cruz')
      expect(normalizeName('maría del carmen')).toBe('María Del Carmen')
    })
  })

  describe('isValidPhone', () => {
    it('should validate Colombian phone numbers', () => {
      expect(isValidPhone('3001234567')).toBe(true)
      expect(isValidPhone('300 123 4567')).toBe(true)
      expect(isValidPhone('+57 300 123 4567')).toBe(true)
      expect(isValidPhone('(300) 123-4567')).toBe(true)
    })

    it('should validate minimum 7 digits', () => {
      expect(isValidPhone('1234567')).toBe(true)
      expect(isValidPhone('123 4567')).toBe(true)
      expect(isValidPhone('123-4567')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123456')).toBe(false) // Solo 6 dígitos
      expect(isValidPhone('12345')).toBe(false)
      expect(isValidPhone('')).toBe(false)
      expect(isValidPhone('abc')).toBe(false)
    })

    it('should ignore non-numeric characters', () => {
      expect(isValidPhone('+57 (300) 123-4567')).toBe(true)
      expect(isValidPhone('300.123.4567')).toBe(true)
    })
  })

  describe('normalizePhone', () => {
    it('should format 10-digit Colombian numbers', () => {
      expect(normalizePhone('3001234567')).toBe('300 123 4567')
      expect(normalizePhone('3121234567')).toBe('312 123 4567')
    })

    it('should preserve international prefix', () => {
      // Con 13 dígitos, formatea en grupos de 3
      expect(normalizePhone('+573001234567')).toBe('+573 001 234 567')
    })

    it('should format numbers with less than 10 digits', () => {
      expect(normalizePhone('1234567')).toBe('123 456 7')
      expect(normalizePhone('12345')).toBe('123 45')
    })

    it('should handle already formatted numbers', () => {
      expect(normalizePhone('300 123 4567')).toBe('300 123 4567')
      // Con espacios, los dígitos extraídos son 13, así que formatea en grupos de 3
      expect(normalizePhone('+57 300 123 4567')).toBe('+573 001 234 567')
    })

    it('should remove non-numeric characters except +', () => {
      expect(normalizePhone('(300) 123-4567')).toBe('300 123 4567')
      expect(normalizePhone('300.123.4567')).toBe('300 123 4567')
    })

    it('should handle empty strings', () => {
      expect(normalizePhone('')).toBe('')
      expect(normalizePhone('   ')).toBe('')
    })

    it('should handle special characters', () => {
      // Extrae 13 dígitos, formatea en grupos de 3
      expect(normalizePhone('+57 (300) 123-4567')).toBe('+573 001 234 567')
      expect(normalizePhone('300-123-4567')).toBe('300 123 4567')
    })
  })

  describe('hasMinLength', () => {
    it('should validate minimum length', () => {
      expect(hasMinLength('hello', 3)).toBe(true)
      expect(hasMinLength('hi', 3)).toBe(false)
      expect(hasMinLength('test', 4)).toBe(true)
    })

    it('should trim whitespace before checking', () => {
      expect(hasMinLength('  hello  ', 5)).toBe(true)
      expect(hasMinLength('  hi  ', 5)).toBe(false)
    })

    it('should handle empty strings', () => {
      expect(hasMinLength('', 1)).toBe(false)
      expect(hasMinLength('   ', 1)).toBe(false)
    })

    it('should handle zero minimum', () => {
      expect(hasMinLength('', 0)).toBe(true)
      expect(hasMinLength('test', 0)).toBe(true)
    })
  })
})
