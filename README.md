## **📖 README FINAL OBLIGATOIRE**

## Prérequis 👨🏼‍🏫

- [Node](https://nodejs.org/fr) (v24.6.0)
- [Git](https://git-scm.com/)

### **🚀 Quick Start**

### Clone et démarrage en une commande

```bash
  git clone git@github.com:baptistemontecot/react-internal-tools-management.git
  cd internal-tools-dashboard
  npm install && npm run dev
```
Dashboard disponible sur http://localhost:5173/

### **🏗️ Architecture**

```
📦src/
├── 📂components/  # Design system réutilisé (Cards, Buttons, Skeletons)
├── 📂context/     # Provider
├── 📂hooks/       # useDashboard, useFilters
├── 📂pages/       # Dashboard → Tools → Analytics
│   ├── Dashboard/ # KPIs Cards + Recent Tools
│   ├── Tools/     # Catalogue + Filtres avancés
│   └── Analytics/ # Charts + Insights
├── 📂stores/      # Zustand pour state management
├── 📂types/
└── 📂utils/       # Axios, Filter
```

### **🎨 Design System Evolution**

- Theme dark moderne, gradients purple/blue/pink
- Color palette stricte (emerald, purple, red, pink)
- Typography Inter, Icons Lucide React

### **📊 Data Integration Strategy**

JSON Server Backend : `https://tt-jsonserver-01.alt-tools.tech`
- GET /analytics → KPIs Dashboard
- GET /tools → Catalogue complet + filtres 
- GET /departments → Filtres par département 
- Relations : Tools ↔ Users ↔ Departments
- Real-time sync avec error/loading states

### **📱 Progressive Responsive Design**

Mobile-first breakpoints :
- Mobile ≤640px : Stack layouts, hamburger menu, cards single column
- Tablet 640-1024px : Mixed layouts, collapsible panels, 2-col grids
- Desktop ≥1024px : Full layouts, multi-column, complete interactions

### **🧪 Testing Strategy**

*Tests unitaires et stratégie QA sur l'ensemble*

### **⚡ Performance Optimizations**

Lazy loading des charts
- Skeleton screens créatifs pendant loading
- Memoization des filtres complexes
- Image optimization des tool icons

### **🎯 Design Consistency Approach**

*Comment vous avez maintenu la cohérence sans mockups J7-J8*

### **📈 Data Visualization Philosophy**

*Choix de charts library et intégration design system*

### **🔮 Next Steps / Complete App Vision**

Export capabilities → PDF/Excel avec style cohérent
- Création d'un conteneur Node
- User management → Roles, permissions, onboarding
- API ouverte → Intégrations tierces
- Mobile app native → Extension PWA