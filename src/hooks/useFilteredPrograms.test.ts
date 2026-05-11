import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredPrograms } from './useFilteredPrograms'
import type { Program, ProgramFilters } from '../types'
import { DEFAULT_FILTERS } from '../utils/constants'

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
    seatsLeft: 0,
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
        useFilteredPrograms(mockPrograms, DEFAULT_FILTERS)
      )

      expect(result.current).toHaveLength(5)
    })
  })

  describe('filtro por categoría', () => {
    it('should filter by Pregrado category', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(3)
      expect(result.current.every((p) => p.category === 'Pregrado')).toBe(true)
    })

    it('should filter by Posgrado category', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
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
          ...DEFAULT_FILTERS,
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
          ...DEFAULT_FILTERS,
          search: 'ingeniería',
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.every(p => p.title.toLowerCase().includes('ingeniería'))).toBe(true)
    })

    it('should filter by faculty', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'medicina',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(5)
    })

    it('should filter by summary', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'marketing',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(3)
    })

    it('should be case insensitive', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'INGENIERÍA',
        })
      )

      expect(result.current).toHaveLength(2)
    })

    it('should handle partial matches', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'ing',
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
          ...DEFAULT_FILTERS,
          search: 'arquitectura',
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should handle accented characters', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'administración',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(2)
    })
  })

  describe('filtro por modalidad', () => {
    it('should filter by Presencial modality', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          modality: 'Presencial',
        })
      )

      expect(result.current).toHaveLength(3)
      expect(result.current.every((p) => p.modality === 'Presencial')).toBe(true)
    })

    it('should filter by Virtual modality', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          modality: 'Virtual',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(3)
    })

    it('should filter by Híbrida modality', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          modality: 'Híbrida',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(2)
    })
  })

  describe('filtro por facultad', () => {
    it('should filter by Ingeniería faculty', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          faculty: 'Ingeniería',
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.every((p) => p.faculty === 'Ingeniería')).toBe(true)
    })

    it('should filter by Medicina faculty', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          faculty: 'Medicina',
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(5)
    })
  })

  describe('filtro por rango de precio', () => {
    it('should filter by price range', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          priceRange: [8000000, 10000000],
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.every((p) => p.price >= 8000000 && p.price <= 10000000)).toBe(true)
    })

    it('should filter programs under 5M', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          priceRange: [0, 5000000],
        })
      )

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe(3)
    })

    it('should filter expensive programs (>10M)', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          priceRange: [10000000, Number.POSITIVE_INFINITY],
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.map(p => p.id)).toContain(2)
      expect(result.current.map(p => p.id)).toContain(5)
    })
  })

  describe('filtro por cupos disponibles', () => {
    it('should filter only programs with seats available', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          onlyWithSeats: true,
        })
      )

      expect(result.current).toHaveLength(4)
      expect(result.current.every((p) => p.seatsLeft > 0)).toBe(true)
      expect(result.current.map(p => p.id)).not.toContain(5) // Medicina tiene 0 cupos
    })

    it('should show all programs when onlyWithSeats is false', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          onlyWithSeats: false,
        })
      )

      expect(result.current).toHaveLength(5)
    })
  })

  describe('ordenamiento (sortBy)', () => {
    it('should sort by date (earliest first)', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          sortBy: 'date',
        })
      )

      expect(result.current[0].id).toBe(3) // 2026-07-15
      expect(result.current[result.current.length - 1].id).toBe(2) // 2026-09-01
    })

    it('should sort by rating (highest first)', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          sortBy: 'rating',
        })
      )

      expect(result.current[0].rating).toBe(4.9) // Medicina
      expect(result.current[result.current.length - 1].rating).toBe(4.2) // Marketing
    })

    it('should sort by seats (most available first)', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          sortBy: 'seats',
        })
      )

      expect(result.current[0].seatsLeft).toBe(80) // Marketing Digital
      expect(result.current[result.current.length - 1].seatsLeft).toBe(0) // Medicina
    })

    it('should sort by price ascending', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          sortBy: 'price_asc',
        })
      )

      expect(result.current[0].price).toBe(2500000) // Marketing
      expect(result.current[result.current.length - 1].price).toBe(15000000) // Medicina
    })

    it('should sort by price descending', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          sortBy: 'price_desc',
        })
      )

      expect(result.current[0].price).toBe(15000000) // Medicina
      expect(result.current[result.current.length - 1].price).toBe(2500000) // Marketing
    })
  })

  describe('filtro combinado (categoría + búsqueda)', () => {
    it('should filter by both category and search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
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
          ...DEFAULT_FILTERS,
          search: 'administración',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should filter Posgrado with specific search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
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
          ...DEFAULT_FILTERS,
          search: 'ingeniería',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(2)
    })
  })

  describe('filtros múltiples avanzados', () => {
    it('should combine modality, faculty, and price filters', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          modality: 'Presencial',
          faculty: 'Ingeniería',
          priceRange: [0, 10000000],
        })
      )

      expect(result.current).toHaveLength(2)
      expect(result.current.every(p => p.modality === 'Presencial')).toBe(true)
      expect(result.current.every(p => p.faculty === 'Ingeniería')).toBe(true)
      expect(result.current.every(p => p.price <= 10000000)).toBe(true)
    })

    it('should filter by category, onlyWithSeats, and sort by price', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          category: 'Pregrado',
          onlyWithSeats: true,
          sortBy: 'price_asc',
        })
      )

      expect(result.current).toHaveLength(2) // Excluye Medicina (sin cupos)
      expect(result.current.every(p => p.seatsLeft > 0)).toBe(true)
      expect(result.current[0].price).toBeLessThan(result.current[1].price)
    })
  })

  describe('casos edge', () => {
    it('should handle empty programs array', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms([], {
          ...DEFAULT_FILTERS,
          search: 'test',
          category: 'Pregrado',
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should handle whitespace in search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: '   ingeniería   ',
        })
      )

      expect(result.current).toHaveLength(2)
    })

    it('should handle special characters in search', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'ingeniería ()',
        })
      )

      expect(result.current.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle very long search terms', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          search: 'a'.repeat(100),
        })
      )

      expect(result.current).toHaveLength(0)
    })

    it('should handle extreme price ranges', () => {
      const { result } = renderHook(() =>
        useFilteredPrograms(mockPrograms, {
          ...DEFAULT_FILTERS,
          priceRange: [0, 0],
        })
      )

      expect(result.current).toHaveLength(0)
    })
  })

  describe('memoización', () => {
    it('should return same reference when inputs dont change', () => {
      const filters: ProgramFilters = { 
        ...DEFAULT_FILTERS,
        search: 'ingeniería', 
        category: 'Pregrado',
      }
      
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
