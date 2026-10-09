# Google Stitch Design System

## Design Tokens

### Colors
```
primary: #1976d2
onPrimary: #ffffff
primaryContainer: #e3f2fd
onPrimaryContainer: #000000

secondary: #ff9800
onSecondary: #ffffff
secondaryContainer: #fff3e0
onSecondaryContainer: #000000

error: #f44336
onError: #ffffff
errorContainer: #ffebee
onErrorContainer: #000000

success: #4caf50
onSuccess: #ffffff
successContainer: #e8f5e9
onSuccessContainer: #000000

background: #fafafa
onBackground: #212121
surface: #ffffff
onSurface: #212121
surfaceVariant: #f5f5f5
onSurfaceVariant: #757575

disabled: #b0b0b0
disabledContainer: #eeeeee
```

### Typography
```
fontFamily: Roboto
fontWeightRegular: 400
fontWeightMedium: 500
fontWeightBold: 700

displayLarge: 36px / 400 / tracking: -0.02em
displayMedium: 30px / 400 / tracking: -0.015em
displaySmall: 24px / 400 / tracking: 0em
headlineMedium: 20px / 500 / tracking: 0.005em
titleLarge: 18px / 500 / tracking: 0.002em
bodyMedium: 16px / 400 / tracking: 0em
bodySmall: 14px / 400 / tracking: 0.25em
labelLarge: 13px / 500 / tracking: 0em
labelSmall: 11px / 500 / tracking: 0.2em
```

### Spacing
```
spacingXXXS: 2px
spacingXXS: 4px
spacingXS: 8px
spacingSM: 12px
spacingMD: 16px
spacingLG: 20px
spacingXL: 24px
spacingXXL: 28px
spacingXXXL: 32px
spacingxxxxL: 40px
spacingxxxxxL: 48px
spacingxxxxxxL: 64px
```

### Elevation
```
elevationLevel0: 0 0 0 0 rgba(0, 0, 0, 0)
elevationLevel1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
elevationLevel2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
elevationLevel3: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.25)
elevationLevel4: 0 15px 25px rgba(0, 0, 0, 0.24), 0 10px 10px rgba(0, 0, 0, 0.16)
elevationLevel6: 0 20px 40px rgba(0, 0, 0, 0.30)
```

### Border Radius
```
radiusSmall: 4px
radiusMedium: 8px
radiusRounded: 16px
radiusCircular: 999px
```

### Opacity
```
opacityHigh: 0.87
opacityMedium: 0.54
opacityLow: 0.38
opacityDisabled: 0.24
```

## Component Library

### Buttons

#### Primary Button
```jsx
import { Stitch } from '@google/stitch-components';

<Stitch.Button
  variant="filled"
  color="primary"
  size="medium"
  style={{
    height: 36,
    minWidth: 88,
    padding: '8px 16px',
    borderRadius: 4
  }}
>
  Acción Principal
</Stitch.Button>
```

#### Secondary Button
```jsx
<Stitch.Button
  variant="outlined"
  color="primary"
  size="medium"
  style={{
    height: 36,
    minWidth: 88,
    padding: '8px 16px',
    borderRadius: 4,
    borderWidth: 1
  }}
>
  Secundario
</Stitch.Button>
```

#### Icon Button
```jsx
<Stitch.IconButton
  icon="pets"
  color="primary"
  size="medium"
  aria-label="Menú"
/>
```

#### FAB (Floating Action Button)
```jsx
<Stitch.FAB
  icon="add"
  color="primary"
  size="large"
  style={{
    width: 56,
    height: 56,
    borderRadius: 28
  }}
/>
```

### Text Fields

#### Input Field
```jsx
<Stitch.TextField
  label="Nombre Propietario"
  placeholder="Ingrese nombre"
  variant="outlined"
  color="primary"
  required
  style={{
    width: '100%',
    minHeight: 48
  }}
/>
```

#### Select Field
```jsx
<Stitch.Select
  label="Especie"
  value={selectedSpecies}
  onChange={handleSpeciesChange}
  style={{ width: '100%' }}
>
  <Stitch.SelectItem value="Perro" label="Perro" />
  <Stitch.SelectItem value="Gato" label="Gato" />
  <Stitch.SelectItem value="Loro" label="Loro" />
  <Stitch.SelectItem value="Otro" label="Otro" />
</Stitch.Select>
```

#### Number Input
```jsx
<Stitch.NumberField
  label="Edad"
  placeholder="Años"
  min={0}
  max={30}
  style={{ width: '100%' }}
/>
```

### Cards
```jsx
<Stitch.Card
  elevation={1}
  style={{
    borderRadius: 8,
    padding: 16,
    margin: '16px',
    maxWidth: 480
  }}
>
  <Stitch.Title1>{cardTitle}</Stitch.Title1>
  <Stitch.BodyText>{cardSubtitle}</Stitch.BodyText>
  <Stitch.BodyMedium className="card-content">{cardContent}</Stitch.BodyMedium>
</Stitch.Card>
```

### Lists
```jsx
<Stitch.List dense>
  <Stitch.ListItem
    secondaryText="Propietario: Juan Pérez"
    primaryAction={
      <Stitch.ListItemPrimaryAction>
        <Stitch.BodyMedium>Bella - Perra</Stitch.BodyMedium>
        <Stitch.BodySmall color="onSurfaceVariant">Raza: Labrador</Stitch.BodySmall>
      </Stitch.ListItemPrimaryAction>
    }
    trailingAction={<Stitch.Icon>chevron_right</Stitch.Icon>}
  />
</Stitch.List>
```

### Data Table
```jsx
<Stitch.DataTable>
  <Stitch.DataTableHeader>
    <Stitch.DataTableColumn>Fecha</Stitch.DataTableColumn>
    <Stitch.DataTableColumn>Motivo</Stitch.DataTableColumn>
    <Stitch.DataTableColumn>Estado</Stitch.DataTableColumn>
    <Stitch.DataTableColumn>Acciones</Stitch.DataTableColumn>
  </Stitch.DataTableHeader>
  <Stitch.DataTableBody>
    <Stitch.DataTableRow>
      <Stitch.DataTableCell>2024-01-15</Stitch.DataTableCell>
      <Stitch.DataTableCell>Consulta general</Stitch.DataTableCell>
      <Stitch.DataTableCell>
        <Stitch.Tag color="primary">Pendiente</Stitch.Tag>
      </Stitch.DataTableCell>
      <Stitch.DataTableCell>
        <Stitch.IconButton icon="edit" aria-label="Editar" />
      </Stitch.DataTableCell>
    </Stitch.DataTableRow>
  </Stitch.DataTableBody>
</Stitch.DataTable>
```

### Dialog/Modal
```jsx
const [open, setOpen] = React.useState(false);

<Stitch.Dialog
  open={open}
  onDismiss={() => setOpen(false)}
  aria-label="Registrar cita"
  style={{ maxWidth: 480 }}
>
  <Stitch.DialogTitle>Registrar Nueva Cita</Stitch.DialogTitle>
  <Stitch.DialogContent style={{ padding: '16px 0' }}>
    <Stitch.TextField
      label="Paciente"
      select
      style={{ marginBottom: 16 }}
    >
      <Stitch.SelectItem value="bella" label="Bella - Labrador" />
      <Stitch.SelectItem value="max" label="Max - Golden" />
    </Stitch.TextField>
    <Stitch.DatePicker
      label="Fecha"
      style={{ marginBottom: 16 }}
    />
    <Stitch.TextField
      label="Motivo"
      placeholder="Consulta, vacuna, etc."
      multiline
      rows={3}
    />
  </Stitch.DialogContent>
  <Stitch.DialogActions>
    <Stitch.Button variant="text" onClick={() => setOpen(false)}>
      Cancelar
    </Stitch.Button>
    <Stitch.Button variant="filled" color="primary">
      Agendar
    </Stitch.Button>
  </Stitch.DialogActions>
</Stitch.Dialog>
```

### App Bar
```jsx
<Stitch.TopAppBar
  navigationIcon={
    <Stitch.IconButton icon="menu" aria-label="Menú" />
  }
  title="Clínica Veterinaria"
  actionItems={[
    <Stitch.IconButton key="settings" icon="settings" aria-label="Configuración" />,
  ]}
/>
```

### Bottom Navigation
```jsx
<Stitch.BottomNavigation
  selectedIndex={currentTab}
  onIndexChanged={handleTabChange}
>
  <Stitch.BottomNavGroup icon="pets" label="Pacientes" href="/pacientes" />
  <Stitch.BottomNavGroup icon="date_range" label="Citas" href="/citas" />
  <Stitch.BottomNavGroup icon="description" label="Historial" href="/historial" />
</Stitch.BottomNavigation>
```

### Snack Bars
```jsx
<Stitch.Snackbar
  open={snackbarOpen}
  message="Cita agendada exitosamente"
  actionLabel="Deshacer"
  onClose={() => setSnackbarOpen(false)}
/>
```

### Progress Indicators
```jsx
<Stitch.CircularProgress
  color="primary"
  size={40}
  thickness={4}
/>

<Stitch.LinearProgress
  color="primary"
  height={6}
  style={{ borderRadius: 3 }}
/>
```

### Chips
```jsx
<Stitch.Chip
  label="Perro"
  icon="pets"
  color="primary"
  selectable
  onSelectedChange={handleChipChange}
/>

<Stitch.FilterChip
  label="Pendiente"
  selected={selectedState === 'Pendiente'}
  onSelectedChange={() => setStateFilter('Pendiente')}
/>

<Stitch.InputChip
  label="Vacunación"
  onDeleted={handleRemoveTag}
/>
```

## Screen Templates

### Dashboard Screen
```jsx
<Layout>
  <AppHeader />
  <Grid container spacing={2} style={{ padding: 16 }}>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            icon="pets"
            title="Pacientes"
            value={patientCount}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            icon="event"
            title="Citas"
            value={appointmentCount}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            icon="description"
            title="Historial"
            value={historyCount}
            color="success"
          />
        </Grid>
      </Grid>
    </Grid>
    
    <Grid item xs={12}>
      <Stitch.Card>
        <Stitch.Title2>Actividad Reciente</Stitch.Title2>
        <ActivityList activities={recentActivities} />
      </Stitch.Card>
    </Grid>
  </Grid>
  <AppFooter />
</Layout>
```

### Paciente Registration Screen
```jsx
<Layout>
  <AppHeader title="Registrar Paciente" />
  <Grid container justifyContent="center">
    <Grid item xs={12} md={6}>
      <Stitch.Card>
        <Stitch.CardBody>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stitch.Title3>Datos del Propietario</Stitch.Title3>
              </Grid>
              
              <Grid item xs={12}>
                <Stitch.TextField
                  label="Nombre Propietario"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={6}>
                <Stitch.TextField
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={6}>
                <Stitch.TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Stitch.Divider>Mascota</Stitch.Divider>
              </Grid>
              
              <Grid item xs={12}>
                <Stitch.TextField
                  label="Nombre de la Mascota"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={4}>
                <Stitch.Select
                  label="Especie"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                >
                  <Stitch.SelectItem value="Perro" label="Perro" />
                  <Stitch.SelectItem value="Gato" label="Gato" />
                  <Stitch.SelectItem value="Loro" label="Loro" />
                  <Stitch.SelectItem value="Reptil" label="Reptil" />
                  <Stitch.SelectItem value="Otro" label="Otro" />
                </Stitch.Select>
              </Grid>
              
              <Grid item xs={4}>
                <Stitch.TextField
                  label="Raza"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={4}>
                <Stitch.NumberField
                  label="Edad"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  inputProps={{ min: 0, max: 30 }}
                />
              </Grid>
            </Grid>
          </form>
        </Stitch.CardBody>
        <Stitch.CardActions>
          <Stitch.Button variant="text" onClick={onCancel}>Cancelar</Stitch.Button>
          <Stitch.Button variant="filled" color="primary" type="submit">
            Guardar
          </Stitch.Button>
        </Stitch.CardActions>
      </Stitch.Card>
    </Grid>
  </Grid>
</Layout>
```

## API Integration

### Endpoint Configuration
```javascript
import { StitchClient } from '@google/stitch-components';

const apiClient = new StitchClient({
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pacientes endpoints
export const pacientesService = {
  getAll: () => apiClient.get('/api/pacientes/lista'),
  create: (data) => apiClient.post('/api/pacientes/registrar', data),
};

// Citas endpoints
export const citasService = {
  getAll: () => apiClient.get('/api/citas/lista'),
  create: (data) => apiClient.post('/api/citas/agendar', data),
};

// Historial endpoints
export const historialService = {
  getAll: () => apiClient.get('/api/historial/lista'),
  create: (data) => apiClient.post('/api/historial/registrar', data),
};
```

## State Management

### Global States
```javascript
// Patient context
const [patients, setPatients] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Appointment context
const [appointments, setAppointments] = useState([]);
const [selectedPatient, setSelectedPatient] = useState(null);

// History context
const [treatments, setTreatments] = useState([]);
const [currentPatientHistory, setCurrentPatientHistory] = useState([]);
```

## Responsive Design Breakpoints
```
xs: 0px
sm: 600px
md: 960px
lg: 1280px
xl: 1536px
```

## Accessibility
- All interactive elements have accessible labels
- Color contrast meets WCAG 2.1 AA standards
- Keyboard navigation fully supported
- Focus indicators visible on all interactive elements
- Semantic HTML structure used throughout
