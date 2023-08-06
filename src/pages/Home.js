import React, { useState } from 'react';
import destinationData from '../data/destination.json';
import search from '../data/search.json';
import RenderBody from '../_Layout/RenderBody';
import FeaturedServices from '../Component/FeaturedServices';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const Home = () => {
  const pageTitle = 'PinSoft | Anasasyfa';

  const [departureCityCodeOnly, setDepartureCityCodeOnly] = useState('');
  const [returnCityCodeOnly, setReturnCityCodeOnly] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [returnCity, setReturnCity] = useState('');
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredReturnCities, setFilteredReturnCities] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);

  const handleDepartureChange = (event) => {
    const value = event.target.value;
    setDepartureCity(value);

    const filteredCities = destinationData.ports.filter(
      (city) =>
        city.explanation.toLowerCase().includes(value.toLowerCase()) ||
        city.codeOnly.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDepartureCities(filteredCities);

    const cityList = document.getElementById('from-list');
    if (value) {
      cityList.style.display = 'block';
    } else {
      cityList.style.display = 'none';
    }
  };
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState("option2");

  const handleRoundTrip = (event) => {
    if (event.target.value === "option1") {
      setSelectedOption1("option1");
      setSelectedOption2(null);
    } else if (event.target.value === "option2") {
      setSelectedOption1(null);
      setSelectedOption2("option2");
    }
  };

  const handleReturnChange = (event) => {
    const value = event.target.value;
    setReturnCity(value);

    const filteredCities = destinationData.ports.filter(
      (city) =>
        city.explanation.toLowerCase().includes(value.toLowerCase()) ||
        city.codeOnly.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredReturnCities(filteredCities);

    const cityList = document.getElementById('to-list');
    if (value) {
      cityList.style.display = 'block';
    } else {
      cityList.style.display = 'none';
    }
  };


  const handleDepartureCitySelect = (city) => {
    const selectedCity = `${city.explanation} Havalimanı (${city.codeOnly})`;
    if (selectedCity === returnCity) {
      setReturnCity('');
      setReturnCityCodeOnly('');
    }
    setDepartureCity(selectedCity);
    setDepartureCityCodeOnly(city.codeOnly);
    setFilteredDepartureCities([]);

    const cityList = document.getElementById('from-list');
    cityList.style.display = 'none';
  };

  const handleReturnCitySelect = (city) => {
    const selectedCity = `${city.explanation} Havalimanı (${city.codeOnly})`;
    if (selectedCity === departureCity) {
      setDepartureCity('');
      setDepartureCityCodeOnly('');
    }
    setReturnCity(selectedCity);
    setReturnCityCodeOnly(city.codeOnly);
    setFilteredReturnCities([]);

    const cityList = document.getElementById('to-list');
    cityList.style.display = 'none';
  };


  const handleFlightSearch = () => {
    if (!departureCity || !returnCity || !departureDate || (selectedOption2 !== "option2" && !returnDate)) {
      showWarningAlert();
      return;
    }

    const searchData = {
      departureCity,
      departureCityCodeOnly,
      returnCity,
      returnCityCodeOnly,
      departureDate,
      returnDate,
      passengerCount,
    };

    const selectedDepartureDate = new Date(departureDate);

    let matchedFlight = null;

    for (const departureLeg of search.departureLegs) {
      const flightDate = new Date(departureLeg.flightDate);

      const departureCityCode = departureLeg.depPort;
      const returnCityCode = departureLeg.arrPort;

      if (
        flightDate.getTime() === selectedDepartureDate.getTime() &&
        departureCityCode === departureCityCodeOnly &&
        returnCityCode === returnCityCodeOnly
      ) {
        matchedFlight = departureLeg;
        break;
      }
    }
    for (const returnLegs of search.returnLegs) {

      const flightDate = new Date(returnLegs.flightDate);


      const departureCityCode = returnLegs.depPort;
      const returnCityCode = returnLegs.arrPort;


      if (
        flightDate.getTime() === selectedDepartureDate.getTime() &&
        departureCityCode === departureCityCodeOnly &&
        returnCityCode === returnCityCodeOnly
      ) {
        matchedFlight = returnLegs;
        break;
      }
    }

    if (!matchedFlight) {
      Swal.fire({
        icon: 'error',
        title: 'Uyarı',
        timer: 2000,
        text: 'Seçilen gidiş tarihi ve rotasyon için uygun uçuş bulunamadı!',
        confirmButtonText: 'Tamam',
      });
      return;
    } else {

      const flightData = JSON.stringify(searchData);
      localStorage.setItem('flightData', flightData);


      window.location.href = '/ucak-bileti';
    }
  };

  const showWarningAlert = () => {
    Swal.fire({
      icon: 'info',
      title: 'Uyarı',
      timer: 1500,
      text: 'Uçuş aramak için şehir ve tarih seçmelisiniz!',
      confirmButtonText: 'Tamam',
    });
  };

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <RenderBody>
        <main>
          <section className="hero-section">
            <div className="hero-content">
              <div className="text-center">
                <h1>Nereyi keşfetmek istersiniz?</h1>
                <p>Bizimle dünyayı keşfedin!</p>
              </div>
              <div className="search-box">
                <div className="search-input">

                  <div className="city-container">
                    <span className="date-label" id="departure-label" style={{ top: '-16px', left: '35px', width: '190px', display: 'flex', alignItems: 'center' }}>

                      <input
                        type="radio"
                        id='gidis-donus'
                        value="option1"
                        checked={selectedOption1 === "option1"}
                        onChange={handleRoundTrip}
                        style={{ width: '20px', marginRight: '0' }} /><label htmlFor='gidis-donus'>Gidiş-Dönüş</label>
                      <input
                        type="radio"
                        id='tek-yon'
                        value="option2"
                        checked={selectedOption2 === "option2"}
                        onChange={handleRoundTrip}
                        style={{ width: '20px', marginRight: '0' }} /><label htmlFor="tek-yon">Tek yön</label>
                    </span>
                    <input
                      type="text"
                      id="from-input"
                      placeholder="Nereden"
                      onChange={handleDepartureChange}
                      value={departureCity}
                    />
                    <div className="city-list" id="from-list" style={{ display: 'none' }}>
                      <div className="city-list-header">Havalimanı</div>
                      {filteredDepartureCities.map((city) => (
                        <div className="city-item" key={city.code} onClick={() => handleDepartureCitySelect(city)}>
                          <i style={{ marginRight: '5px' }}>
                            <FontAwesomeIcon icon={faPlaneDeparture} />
                          </i>
                          {city.explanation} Havalimanı ({city.codeOnly})
                        </div>
                      ))}
                    </div>

                  </div>
                  <div className="city-container">
                    <input
                      type="text"
                      id="to-input"
                      placeholder="Nereye"
                      onChange={handleReturnChange}
                      value={returnCity}
                    />
                    <div className="city-list" id="to-list" style={{ display: 'none' }}>
                      <div className="city-list-header">Havalimanı</div>
                      {filteredReturnCities.map((city) => (
                        <div className="city-item" key={city.code} onClick={() => handleReturnCitySelect(city)}>
                          <i style={{ marginRight: '5px' }}>
                            <FontAwesomeIcon icon={faPlaneDeparture} />
                          </i>
                          {city.explanation} Havalimanı ({city.codeOnly})
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedOption1 === "option1" &&

                    <><div className="date-container">
                      <span className="date-label" id="departure-label">
                        Gidiş Tarihi
                      </span>
                      <input
                        type="date"
                        id="departure-date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)} />
                    </div>
                      <div className="date-container">
                        <span className="date-label" id="return-label">
                          Dönüş Tarihi
                        </span>
                        <input
                          type="date"
                          id="return-date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)} />
                      </div></>
                  }
                  {selectedOption2 === "option2" &&


                    <div className="date-container">
                      <span className="date-label" id="departure-label">
                        Gidiş Tarihi
                      </span>
                      <input
                        type="date"
                        id="departure-date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)} />
                    </div>

                  }



                  <div className="date-container">
                    <span className="date-label" id="return-label">
                      Yolcu
                    </span>
                    <select
                      name=""
                      id=""
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <button onClick={handleFlightSearch}>Uçuş Ara</button>
                </div>
              </div>
            </div>
          </section>
          <FeaturedServices />
        </main>
      </RenderBody>
    </div>
  );
};

export default Home;
