

## Plán: Ikona pro "Čištění a revize"

### Problém
Současný PNG obrázek neodpovídá stylu Lucide ikon (tenké čáry, bez výplně, 24×24).

### Řešení
Vytvořit **vlastní React SVG komponent** ve stylu Lucide — kruhový komínový kartáč na tyči.

### Technické kroky

1. **Vytvořit `src/components/icons/ChimneyBrushIcon.tsx`**
   - SVG 24×24, `stroke="currentColor"`, `strokeWidth={2}`, `fill="none"`
   - Motiv: kruhový kartáč (bristles) nahoře + dlouhá tyč dolů
   - Přijímá stejné props jako Lucide ikony (`size`, `className`)

2. **Upravit `src/components/Services.tsx`**
   - Odstranit import PNG obrázku
   - Importovat nový `ChimneyBrushIcon`
   - Použít ho stejně jako ostatní Lucide ikony (s `size={28}` a `className="text-primary mb-4"`)
   - Zjednodušit typ `ServiceItem` — odstranit `customIcon`, použít jednotný `icon`

3. **Smazat `src/assets/chimney-brush-icon.png`**

### Výsledek
Ikona bude vizuálně nerozlišitelná od ostatních Lucide ikon — stejná tloušťka čar, stejné proporce, stejná barva.

