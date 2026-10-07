(() => {
  const routes = {
    1: {
      title: 'Dzień 1 · Watykan i Zamek Świętego Anioła',
      label: 'Mapa dnia 1: Watykan i Zamek Świętego Anioła',
      link: 'https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=41.90655%2C12.45460%3B41.90290%2C12.45450%3B41.90224%2C12.45736%3B41.90205%2C12.45394%3B41.90312%2C12.46634%3B41.90192%2C12.46646',
      points: [['Muzea Watykańskie',41.90655,12.45460],['Kaplica Sykstyńska',41.90290,12.45450],['Plac św. Piotra',41.90224,12.45736],['Bazylika św. Piotra',41.90205,12.45394],['Zamek Świętego Anioła',41.90312,12.46634],['Most Świętego Anioła',41.90192,12.46646]]
    },
    2: {
      title: 'Dzień 2 · Bazyliki i centrum Rzymu',
      label: 'Mapa dnia 2: bazyliki i centrum Rzymu',
      link: 'https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=41.89893%2C12.47312%3B41.89862%2C12.47683%3B41.89481%2C12.47927%3B41.90224%2C12.45736%3B41.88585%2C12.50559%3B41.89763%2C12.49847%3B41.90098%2C12.48328%3B41.90598%2C12.48255%3B41.91220%2C12.48110%3B41.91075%2C12.47636',
      points: [['Piazza Navona',41.89893,12.47312],['Panteon',41.89862,12.47683],['Kościół św. Stanisława',41.89481,12.47927],['Plac św. Piotra',41.90224,12.45736],['Bazylika św. Jana na Lateranie',41.88585,12.50559],['Santa Maria Maggiore',41.89763,12.49847],['Fontanna di Trevi',41.90098,12.48328],['Schody Hiszpańskie',41.90598,12.48255],['Pincio',41.91220,12.48110],['Piazza del Popolo',41.91075,12.47636]]
    },
    3: {
      title: 'Dzień 3 · Starożytny Rzym, Awentyn i Trastevere',
      label: 'Mapa dnia 3: starożytny Rzym, Awentyn i Trastevere',
      link: 'https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=41.89094%2C12.49190%3B41.89164%2C12.48673%3B41.89325%2C12.48299%3B41.89469%2C12.48307%3B41.89195%2C12.47976%3B41.88826%2C12.48154%3B41.88493%2C12.48045%3B41.85870%2C12.47678%3B41.88942%2C12.46950',
      points: [['Koloseum',41.89094,12.49190],['Forum Romanum i Palatyn',41.89164,12.48673],['Kapitol',41.89325,12.48299],['Vittoriano',41.89469,12.48307],['Teatr Marcellusa',41.89195,12.47976],['Usta Prawdy',41.88826,12.48154],['Ogród Pomarańczowy',41.88493,12.48045],['Bazylika św. Pawła za Murami',41.85870,12.47678],['Trastevere',41.88942,12.46950]]
    }
  };

  let map = null;

  function numberIcon(number) {
    return L.divIcon({className:'map-number',html:`<span>${number}</span>`,iconSize:[30,30],iconAnchor:[15,15]});
  }

  function renderDayMap(day) {
    const host = document.getElementById('dayMap');
    const route = routes[day];
    if (!host || !route || !window.L) return;
    if (map) { map.remove(); map = null; }
    host.innerHTML = `<article class="route-map"><div class="map-canvas" id="mapCurrent" aria-label="${route.label}"></div><div class="map-caption"><strong>${route.title}</strong><p class="muted">Pinezki pokazują kolejne punkty tego dnia. Linia wskazuje kolejność, nie dokładny przebieg przejścia.</p><details><summary>Punkty trasy</summary><ol class="map-stops">${route.points.map(([name],index)=>`<li><b>${index+1}.</b> ${name}</li>`).join('')}</ol></details><a href="${route.link}" target="_blank" rel="noopener">Otwórz trasę w OpenStreetMap</a></div></article>`;
    map = L.map('mapCurrent',{attributionControl:true,zoomControl:false,dragging:false,scrollWheelZoom:false,doubleClickZoom:false,boxZoom:false,keyboard:false,tap:false,touchZoom:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
    const line = route.points.map(([,lat,lon])=>[lat,lon]);
    L.polyline(line,{color:'#8e1b35',weight:4,opacity:.88,dashArray:'7 7'}).addTo(map);
    route.points.forEach(([name,lat,lon],index)=>L.marker([lat,lon],{icon:numberIcon(index+1),keyboard:false}).addTo(map).bindTooltip(`${index+1}. ${name}`,{direction:'top',offset:[0,-13],opacity:.95}));
    map.fitBounds(line,{padding:[30,30],maxZoom:day===2?13:14});
  }

  const currentDay = () => Number(document.querySelector('#days .day-tab.active')?.dataset.day || 1);
  renderDayMap(currentDay());
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-action="day"]');
    if(button) queueMicrotask(()=>renderDayMap(Number(button.dataset.day)));
  });
})();
