export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      produits: {
        Row: {
          id: string
          nom: string
          description: string
          marque: string
          type_produit: string
          domaines_activite: string[]
          image_principale: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          nom: string
          description: string
          marque: string
          type_produit: string
          domaines_activite?: string[]
          image_principale?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nom?: string
          description?: string
          marque?: string
          type_produit?: string
          domaines_activite?: string[]
          image_principale?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
