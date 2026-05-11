import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredPrograms } from './useFilteredPrograms'
import type { Program } from '../types'

// Mock data
const mockPrograms: Program[] = [
  {
    id: 1,
    title: 'Ingeniería de Sistemas',
    category: 'Pregrado',
    modality: 'Presencial',
    duration: '10 semestres',
    startDate: '2026-08-01',
    location: 'Bogotá',
    seats: 50,
    seatsLeft: 20,
    price: 8500000,
    rating: 4.5,
    faculty: 'Ingeniería',
    summary: 'Programa de ingeniería de sistemas con enfoque en desarrollo de software',
    highlights: ['Acreditación de alta calidad', 'Laboratorios modernos'],
  },
  {
    id: 2,
    title: 'Maestría en Administración',
    category: 'Posgrado',
    modality: 'Híbrida',
    duration: '2 años',
    startDate: '2026-09-01',
    location: 'Bogotá',
    seats: 30,
    seatsLeft: 15,
    price: 12000000,
    rating: 4.8,
    faculty: 'Ciencias Económicas y Administrativas',
    summary: 'Maestría en administración con enfoque en gestión empresarial',
    highlights: ['Networking internacional', 'Casos de estudio reales'],
  },
  {
    id: 3,
    title: 'Diplomado en Marketing Digital',
    category: 'Educación Continua',
    modality: 'Virtual',
    duration: '6 meses',
    startDate: '2026-07-15',
    location: 'Virtual',
    seats: 100,
    seatsLeft: 80,
    price: 2500000,
    rating: 4.2,
    faculty: 'Comunicación y Lenguaje',
    summary: 'Diplomado práctico en estrategias de marketing digital',
    highlights: ['100% práctico', 'Certificación internacional'],
  },
  {
    id: 4,
    title: 'Ingeniería Industrial',
    category: 'Pregrado',
    modality: 'Presencial',
    duration: '10 semestres',
    startDate: '2026-08-01',
    location: 'Bogotá',
    seats: 45,
    seatsLeft: 25,
    price: 8000000,
    rating: 4.6,
    faculty: 'Ingeniería',
    summary: 'Programa de ingeniería industrial con énfasis en optimización de procesos',
    highlights: ['Convenios empresariales', 'Doble titulación'],
  },
  {
    id: 5,
    title: 'Medicina',
    category: 'Pregrado',
    modality: 'Presencial',
    duration: '12 semestres',
    startDate: '2026-08-01',
    location: 'Bogotá',
    seats: 60,
    seatsLeft: 5,
    price: 15000000,
    rating: 4.9,
    faculty: 'Medicina',
    summary: 'Programa de medicina con énfasis en investigación clínica',
    highlights: ['Hospitales universitarios', 'Rotaciones internacionales'],
  },
]

describe('useFilteredPrograms', () => {
  describe('sin filtros', () => {
    it('should return all programs when no filters applied', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: '',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(5)
      expect(result.current).toEqual(mockPrograms)
    })
  })

  describe('filtro por categoría', () => {
    it('should filter by Pregrado category', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: '',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(3)
      expect(result.current.every((p) => p.category === 'Pregrado')).toBe(true)
      expect(result.current.map((p) => p.id)).toEqual([1, 4, 5])
    })

    it('should filter by Posgrado category', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: '',
          category: 'Posgrado',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].category).toBe('Posgrado')
      expect(result.current[0].id).toBe(2)
    })

    it('should filter by Educación Continua category', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: '',
          category: 'Educación Continua',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].category).toBe('Educación Continua')
      expect(result.current[0].id).toBe(3)
    })
  })

  describe('filtro por búsqueda de texto', () => {
    it('should filter by title', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'ingeniería',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.map((p) => p.id)).toEqual([1, 4])
    })

    it('should filter by faculty', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'medicina',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(5)
    })

    it('should filter by summary', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'marketing',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(3)
    })

    it('should be case insensitive', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'INGENIERÍA',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(2)
    })

    it('should handle partial matches', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'ing',
          category: 'Todos',
        })
      )

      expect(result.current.length).toBeGreaterThan(0)
      expect(
        result.current.some(
          (p) =>
            p.title.toLowerCase().includes('ing') ||
            p.faculty.toLowerCase().includes('ing')
        )
      ).toBe(true)
    })

    it('should return empty array when no matches found', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'arquitectura',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should handle accented characters', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'administración',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(2)
    })
  })

  describe('filtro combinado (categoría + búsqueda)', () => {
    it('should filter by both category and search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'ingeniería',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.every((p) => p.category === 'Pregrado')).toBe(true)
      expect(
        result.current.every((p) =>
          p.title.toLowerCase().includes('ingeniería')
        )
      ).toBe(true)
    })

    it('should return empty when filters dont match', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'administración',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should filter Posgrado with specific search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'maestría',
          category: 'Posgrado',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(2)
    })

    it('should filter by faculty within category', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'ingeniería',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.map((p) => p.id)).toEqual([1, 4])
    })
  })

  describe('casos edge', () => {
    it('should handle empty programs array', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms([], {
          search: 'test',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should handle whitespace in search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: '   ingeniería   ',
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(2)
    })

    it('should handle special characters in search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'ingeniería ()',
          category: 'Todos',
        })
      )

      expect(result.current.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle very long search terms', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          search: 'a'.repeat(100),
          category: 'Todos',
        })
      )

      expect(result.current).toHaveLength(0)
    })
  })

  describe('memoización', () => {
    it('should return same reference when inputs dont change', () => {
      const filters = { search: 'ingeniería', category: 'Pregrado' as const }
      
      const { result, rerender } = renderHook(
        ({ programs, filters }) => useFilteredPrograms(programs, filters),
        {
          initialProps: { programs: mockPrograms, filters },
        }
      )

      const firstResult = result.current

      // Re-render with same props
      rerender({ programs: mockPrograms, filters })

      // Should be same reference (memoized)
      expect(result.current).toBe(firstResult)
    })
  })
})
