# 🍽️ Signature — Personal Recipe Sharing App

Signature is a full-stack web application where users can upload and share their **signature recipes** — personalized, homemade, or custom dishes like “My Special Maggi,” “Grandma’s Paneer Curry,” or “Sunday Chicken Roast.”

The goal is to create a clean, aesthetic, minimalist platform for users to upload, browse, and interact with unique recipes created by real people.

---

# 📝 Problem Statement

People often create **custom versions** of everyday dishes — special Maggie, their own pasta style, family-secret curries, unique sandwiches, etc.  
But there is **no platform** dedicated exclusively to storing and sharing these **personal signature-style recipes**.

Existing recipe apps focus on professional or generic recipes, not **people’s own creations**.

**Signature** solves this by allowing:
- Users to upload their own recipes  
- Add ingredients, steps, photos, cuisine type  
- View others’ recipes  
- Like and comment on them  

---

# 🎯 App Objective

Create a platform for:
- Uploading custom/personal recipes  
- Browsing user-generated dishes  
- Commenting + liking recipes  
- Maintaining a clean, aesthetic UI  
- Practicing full-stack development using React + Supabase  

---

# 🚀 Features

### 👤 Authentication (Custom-built)
- User signup & login  
- JWT-based authentication (no Supabase auth)

### 🍳 Recipe Upload
Each recipe includes:
- Name  
- Photo  
- Description  
- Time to cook  
- Cuisine  
- Veg/Non-veg boolean  
- Ingredients (text/JSON)  
- Steps (text/JSON)  
- Like count  
- User reference  

### 💬 Comments
- Users can comment on any recipe  
- Linked to user + recipe  
- Shown on recipe details page  

### ❤️ Likes
- Simple like count inside recipe table

### 📄 Pages
- Home (All recipes)
- Login
- Signup
- Add Recipe
- Recipe Details
- My Recipes

---

# 🗄️ Database Schema

### **Table: users**
| Column         | Type        | Notes                        |
|----------------|-------------|------------------------------|
| id             | uuid        | PK                           |
| username       | text        | Unique                       |
| password_hash  | text        | Hashed password              |
| email          | text        | Optional                     |
| created_at     | timestamp   | Default now()                |

### **Table: recipes**
| Column         | Type        | Notes                        |
|----------------|-------------|------------------------------|
| id             | uuid        | PK                           |
| user_id        | uuid        | FK → users.id                |
| name           | text        | Recipe title                 |
| description    | text        | Long description             |
| time_to_cook   | integer     | Time in minutes              |
| cuisine        | text        | Ex: Indian, Italian          |
| is_veg         | boolean     | Veg/Non-veg                  |
| ingredients    | text / json | List of ingredients          |
| steps          | text / json | Step-by-step instructions    |
| photo_url      | text        | Public image URL             |
| like_count     | integer     | Default 0                    |
| created_at     | timestamp   | Default now()                |

### **Table: comments**
| Column         | Type        | Notes                        |
|----------------|-------------|------------------------------|
| id             | uuid        | PK                           |
| user_id        | uuid        | FK → users.id                |
| recipe_id      | uuid        | FK → recipes.id              |
| comment_text   | text        | Comment message              |
| created_at     | timestamp   | Default now()                |

---

# 🎨 Style Guide (For UI Consistency)

This section is meant for AI models to generate components with consistent design.

## **1. Color Palette**

### Primary Colors
- `#4CAF50` — Signature Green (buttons, highlights)
- `#74D9A6` — Mint (accents)
- `#0F3D2E` — Dark Green (strong headings)

### Neutrals
- `#1A1A1A` — Almost Black
- `#333333` — Dark Grey
- `#8A8A8A` — Medium Grey
- `#EAEAEA` — Light Grey
- `#FFFFFF` — White

### Accents
- `#E53935` — Tomato Red (danger)
- `#F9B208` — Gold (icons, subtle accents)

---

## **2. Typography**

### Fonts
- **Primary:** Poppins  
- **Secondary:** Merriweather (optional)

### Font Sizes
- H1 — 32–36px  
- H2 — 24–28px  
- H3 — 20–22px  
- Body — 16px  
- Small — 14px  

### Weights
- Headings: 600–700  
- Body: 400–500  

---

## **3. Spacing Scale**
Use consistent spacing:

