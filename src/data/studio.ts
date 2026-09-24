// Todo o conteúdo do site. Para trocar uma foto, coloque o arquivo em public/images
// e ajuste o caminho aqui.

const img = (file: string) => `/images/${file}.webp`

export const studio = {
  name: 'Meraki',
  subtitle: 'Tattoo',
  tagline: 'Estúdio de tatuagem privado no centro de Itatiba, especializado em preto e branco.',
  award: '3x eleito o melhor estúdio de Itatiba',
  // Texto da seção "O estúdio": a primeira frase aparece em destaque.
  about: [
    'A Meraki é um estúdio de tatuagem privado no centro de Itatiba.',
    'Cada sessão é combinada antes pelo WhatsApp: a ideia, a composição, o tamanho, o local do corpo e o valor. O desenho é feito a partir dessa conversa.',
    'O atendimento é só com horário marcado. No fim da sessão, o próprio Matheus explica os cuidados para a tatuagem cicatrizar bem.',
    'Na recepção tem sofá e café, e o espaço tem plantas, aquário e uma parede cheia de desenhos.',
    'No mesmo endereço funciona a barbearia do Bruno Vieira.',
  ],
  // Topo: três colunas de fotos; cada coluna alterna entre as suas.
  heroPanels: [
    [img('estudio-panorama'), img('estudio-recepcao')],
    [img('estudio-macas'), img('estudio-sala-espera')],
    [img('estudio-estacoes'), img('estudio-aquario')],
  ],
  aboutPhoto: { src: img('estudio-panorama'), alt: 'Salão da Meraki, com o letreiro, o aquário e as estações de tatuagem' },
  bookingImage: img('estudio-sala-espera'),
  address: 'R. Rangel Pestana, 39, Centro, Itatiba/SP',
  hours: 'Somente com hora marcada',
  phone: '(11) 94391-6772',
  whatsapp: '5511943916772',
  instagram: 'meraki.tattoobr',
}

// Significado do nome, exibido logo depois do topo.
export const meaning = {
  greek: 'μεράκι',
  word: 'Meraki',
  origin: 'me·rá·ki · palavra de origem grega',
  essence:
    'Colocar o coração e a energia vital no que se faz, seja uma tarefa simples ou complexa, na arte, no trabalho ou na vida de todo dia.',
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Meraki Tattoo Studio, R. Rangel Pestana, 39, Itatiba',
)}`

export type Style = {
  title: string
  description: string
  image: string
}

// Estilos que aparecem com frequência no portfólio do Matheus.
export const styles: Style[] = [
  { title: 'Realismo', description: 'Retratos e figuras em preto e cinza, como o Zeus e o leão.', image: img('zeus-antebraco') },
  { title: 'Arte sacra', description: 'Jesus, Virgem Maria, anjos e cruzes.', image: img('virgem-maria-braco') },
  { title: 'Oriental', description: 'Máscaras hannya com crisântemos e ondas.', image: img('hannya-crisantemo') },
  { title: 'Lettering', description: 'Frases e nomes desenhados à mão, do fino ao gótico.', image: img('lettering-perna') },
]

export const artist = {
  name: 'Matheus Andrade',
  role: 'Artista da Meraki',
  image: img('matheus-andrade'),
  instagram: 'matheusandrade_1999',
  bio: 'Matheus trabalha principalmente com realismo em preto e cinza: retratos, arte sacra, mitologia e fechamentos de braço, perna e tronco. O desenho é feito para cada cliente, a partir da ideia que chega no orçamento.',
}

export type PortfolioItem = {
  id: number
  title: string
  style: string
  image: string
}

export const portfolio: PortfolioItem[] = [
  { id: 1, title: 'Palhaços e Coringa', style: 'Realismo · Tronco', image: img('torso-palhacos-coringa') },
  { id: 16, title: 'A luz que me guia', style: 'Lettering · Perna', image: img('lettering-perna') },
  { id: 2, title: 'Zeus', style: 'Realismo · Antebraço', image: img('zeus-antebraco') },
  { id: 3, title: 'Medusa', style: 'Blackwork · Coxa', image: img('medusa-coxa') },
  { id: 4, title: 'Virgem Maria', style: 'Realismo · Braço', image: img('virgem-maria-braco') },
  { id: 5, title: 'Hannya e crisântemo', style: 'Oriental · Antebraço', image: img('hannya-crisantemo') },
  { id: 6, title: 'Retrato feminino', style: 'Realismo · Pescoço', image: img('retrato-pescoco') },
  { id: 7, title: 'Leão e cruz', style: 'Realismo · Perna', image: img('leao-cruz-perna') },
  { id: 8, title: 'Anjos', style: 'Realismo · Peito', image: img('anjos-peito') },
  { id: 9, title: 'Tigre floral', style: 'Realismo · Coxa', image: img('tigre-coxa') },
  { id: 10, title: 'Jesus', style: 'Realismo · Peito', image: img('jesus-peito') },
  { id: 11, title: 'Hannya', style: 'Oriental · Antebraço e mão', image: img('hannya-antebraco') },
  { id: 12, title: 'Anjos', style: 'Realismo · Antebraço', image: img('anjos-antebraco') },
  { id: 13, title: 'Lettering', style: 'Caligrafia · Antebraço', image: img('lettering-antebraco') },
  { id: 14, title: 'Árvore e runas', style: 'Blackwork · Pescoço', image: img('pescoco-runas') },
  { id: 15, title: 'Palhaços', style: 'Realismo · Peito', image: img('palhacos-peito') },
]

export type BarberWork = PortfolioItem & { category: 'Locs e tranças' | 'Corte e barba' }

export const barbershop = {
  name: 'Meraki Barbearia',
  instagram: 'barbeariameraki_',
  tagline: 'Locs, tranças, corte e barba no mesmo endereço do estúdio, no centro de Itatiba.',
  specialties: 'Locs · Tranças · Corte · Barba',
  // Fundo da abertura da barbearia: três colunas que se alternam (no celular, uma só)
  heroColumns: [
    [img('barbearia-locs-1'), img('barbearia-degrade-barba'), img('barbearia-freestyle')],
    [img('barbearia-locs-3'), img('barbearia-undercut-desenho'), img('barbearia-feminino')],
    [img('barbearia-locs-2'), img('barbearia-risca-barba'), img('barbearia-desenho')],
  ],
  sign: { src: img('barbearia-letreiro'), alt: 'Letreiro dourado Barbearia Meraki, com tesoura e navalha' },
  intro: 'Locs, tranças, corte e barba.',
  works: [
    { id: 202, title: 'Twist com acessórios', style: 'Locs e tranças', category: 'Locs e tranças', image: img('barbearia-locs-2') },
    { id: 201, title: 'Twists', style: 'Locs e tranças', category: 'Locs e tranças', image: img('barbearia-locs-1') },
    { id: 203, title: 'Tranças nagô com twists', style: 'Locs e tranças', category: 'Locs e tranças', image: img('barbearia-locs-3') },
    { id: 210, title: 'Degradê com barba', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-degrade-barba') },
    { id: 211, title: 'Undercut com desenho', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-undercut-desenho') },
    { id: 212, title: 'Degradê com risca e barba', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-risca-barba') },
    { id: 204, title: 'Desenho na navalha', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-freestyle') },
    { id: 205, title: 'Corte feminino', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-feminino') },
    { id: 206, title: 'Mullet', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-mullet') },
    { id: 207, title: 'Degradê com desenho', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-desenho') },
    { id: 208, title: 'Platinado infantil', style: 'Corte e barba', category: 'Corte e barba', image: img('barbearia-platinado') },
  ] satisfies BarberWork[] as BarberWork[],
  // Seção "Salão da barbearia", no mesmo formato do salão de tatuagem
  space: [
    'É na Meraki que Bruno Vieira recebe seus clientes para serviços de locs, tranças, corte e barba.',
    'O ambiente traduz a identidade da barbearia em cada detalhe: o letreiro dourado da Meraki na parede, a bancada com as ferramentas de trabalho e um espaço pensado para que cada atendimento aconteça com calma e atenção.',
    'Os horários são agendados previamente pelo WhatsApp da Meraki.',
  ],
  place: { src: img('barbearia-bancada'), alt: 'Bancada da barbearia com máquinas e navalhas' },
}

export const barber = {
  name: 'Bruno Vieira',
  role: 'Barbeiro e locsmaker em Itatiba',
  quote: 'Reconstruindo raízes ancestrais',
  image: img('bruno-vieira'),
  bio: 'Bruno cuida da barbearia da Meraki. Faz locs e tranças, e também todo o trabalho de corte e barba: degradê, desenho na navalha, platinado, corte feminino e infantil.',
}

// Avaliações reais do perfil da Meraki no Google, com o texto como foi escrito.
// Nomes abreviados (nome + inicial) por privacidade.
export const reviews = {
  rating: '5,0',
  total: 47,
  featured: {
    name: 'Leonardo G.',
    text: 'Fiz uma sessão de quase 5 horas e, mesmo depois disso, tive acompanhamento nos dias seguintes pra ver como a tatuagem estava e se precisava de algo. Se você pensa em tatuar ou cortar o cabelo lá e escolhe outro lugar... tá tirando no bagulho.',
  },
  list: [
    { name: 'Kely P.', text: 'Um lugar super aconchegante e bem bonito. Além das comidinhas, café etc... o atendimento é excelente!' },
    { name: 'Jonathan C.', text: 'O melhor da cidade, sem duvidas! Nota 10', detail: 'Estilo: blackout · Limpeza: nível cirúrgico' },
    { name: 'Jhonny F.', text: 'O mais brabo de itatiba, parceiro demais. Atendimento excelente e rápido. Local limpo, e com decoração muito dahora.' },
    { name: 'Kaiky F.', text: 'Sensacional!!!, ótimos profissionais, ambiente agradável, e um trabalho impecável que entregam! MERAKI tattoo é o 01 de Itatiba!' },
    { name: 'Rhyan S.', text: 'Ótimo estúdio. E um profissional de extrema qualidade. Todos requesitos pra conforto e uma ótima experiência de arte' },
  ] as { name: string; text: string; detail?: string }[],
}
