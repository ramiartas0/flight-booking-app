import React, { useEffect, useState } from 'react';
import RenderBody from '../_Layout/RenderBody';
import FeaturedServices from '../Component/FeaturedServices';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import searchDatas from '../data/search.json';
import destinationData from '../data/destination.json';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const UcakBileti = () => {
  const pageTitle = 'PinSoft | Uçuşlar';

  const [departureCity, setDepartureCity] = useState('');
  const [returnCity, setReturnCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('');
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredReturnCities, setFilteredReturnCities] = useState([]);
  const [returnCityCodeOnly, setReturnCityCodeOnly] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [departureCityCodeOnly, setDepartureCityCodeOnly] = useState('');

  useEffect(() => {
    const savedFlightData = localStorage.getItem('flightData');
    if (savedFlightData) {
      const searchData = JSON.parse(savedFlightData);
      console.log('Search Data:', searchData);

      setDepartureCity(searchData.departureCityCodeOnly);
      setReturnCity(searchData.returnCityCodeOnly);
      setDepartureDate(searchData.departureDate);
      setReturnDate(searchData.returnDate);
      setPassengerCount(searchData.passengerCount);

      const allFlights = [...searchDatas.departureLegs, ...searchDatas.returnLegs];
      console.log('All Flights:', allFlights);

      const matchingFlights = allFlights.filter(
        (flight) =>
          flight.depPort === searchData.departureCityCodeOnly &&
          flight.arrPort === searchData.returnCityCodeOnly &&
          flight.flightDate === searchData.departureDate
      );
      console.log('Matching Flights:', matchingFlights);


      setFlightData(matchingFlights);
    }
  }, []);

  function tarihTurkceGunler(dateStr) {
    const turkceGunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    const tarih = new Date(dateStr);
    const gunAdi = turkceGunler[tarih.getDay()];

    return gunAdi;
  }

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const formattedTime = `${hour}:${minute}`;
    return formattedTime;
  };
  const calculateDuration = (depTime, arrTime) => {
    const depDate = new Date();
    const [depHour, depMinute] = depTime.split(':');
    depDate.setHours(depHour);
    depDate.setMinutes(depMinute);

    const arrDate = new Date();
    const [arrHour, arrMinute] = arrTime.split(':');
    arrDate.setHours(arrHour);
    arrDate.setMinutes(arrMinute);

    let durationInMinutes = (arrDate - depDate) / (1000 * 60);

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours < 0) {

      durationInMinutes += 24 * 60;
      durationInMinutes %= 24 * 60;

    }

    if (minutes === 0) {
      return `${Math.floor(durationInMinutes / 60)} saat`;
    }
    else {
      return `${Math.floor(durationInMinutes / 60)} saat ${durationInMinutes % 60} dakika`;
    }
  };
  const handleDepartureChange = (event) => {
    const value = event.target.value;
    setDepartureCity(value);

    const filteredCities = destinationData.ports.filter((city) =>
      city.explanation.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDepartureCities(filteredCities);


    const cityList = document.getElementById('from-list');
    if (value) {
      cityList.style.display = 'block';
    } else {
      cityList.style.display = 'none';
    }
  };
  const handleReturnChange = (event) => {
    const value = event.target.value;
    setReturnCity(value);
    const filteredCities = destinationData.ports.filter((city) =>
      city.explanation.toLowerCase().includes(value.toLowerCase())
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
    if (!departureCity || !returnCity || !departureDate || !returnDate) {
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

    const flightData = JSON.stringify(searchData);
    localStorage.setItem('flightData', flightData);

    window.location.href = '/ucak-bileti';
  };
  const showWarningAlert = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Uyarı',
      timer: 1500,
      text: 'Uçuş aramak için şehir ve tarih seçmelisiniz!',
      confirmButtonText: 'Tamam',
    });
  };
  const navigate = useNavigate();
  const handleFlightSelect = (flight) => {
    const selectedFlight = {
      flightId: flight.flightId,
      flightNo: flight.flightNo,
      airline: flight.airline,
      depTime: flight.depTime,
      arrTime: flight.arrTime,
      depPort: flight.depPort,
      arrPort: flight.arrPort,
      flightDate: flight.flightDate,
      amount: flight.priceDetail.basePrice.amount,
      currency: flight.priceDetail.basePrice.currency,
      totalTax: flight.priceDetail.totalTax.amount,
      surcharge: flight.priceDetail.surcharge.amount,
      salesPrice: flight.priceDetail.salesPrice.amount,
    };
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    localStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
    navigate('/ucus-bilgileri');
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
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <RenderBody>
        <main>
          <section className="hero-section">
            <div className="hero-content">
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
          <section className="flight-card">
            <div className="hero-content">
              <div className="search-info">
                <div className="flight-card-info">
                  {flightData.map((flight) => (
                    <div key={flight.flightId}>
                      <div className="cardWrap">
                        <div className="card cardLeft">
                          <div className="airport-name">
                            <img src={flight.airline} width="80px" alt="Airline Logo" />
                          </div>
                          <div className="flight-info">
                            <span className="day">{tarihTurkceGunler(departureDate)}</span>
                            <time className="times">{formatTime(flight.depTime)} </time>
                            <span className="location">{departureCity}</span>
                          </div>
                          <div className="divider">
                            <span className="duration">
                              Süre  <span style={{ color: '#232b38', fontWeight: '600' }}>{calculateDuration(flight.depTime, flight.arrTime)}</span>
                            </span>
                            <div className="rounded"></div>
                            <div className="dotted"></div>
                            <div className="plane">
                              <i> <FontAwesomeIcon icon={faPlaneDeparture} /></i>
                            </div>
                            <div className="dotted"></div>
                            <div className="rounded bg-orange"></div>
                            <span style={{ fontSize: '12px', marginTop: '15px', marginLeft: '65px' }}>Direct</span>
                          </div>
                          <div className="flight-info">
                            <span className="day">{tarihTurkceGunler(departureDate)}</span>
                            <time className="times">{formatTime(flight.arrTime)} </time>
                            <span className="location">{returnCity}</span>
                          </div>
                        </div>
                        <div className="card cardRight">
                          <div className="cardRights">
                            <span style={{ color: '#aaa', fontSize: '13px' }}>Kuyruk No</span><br />
                            <span style={{ color: '#232b38', fontWeight: '600' }}>{flight.flightNo}</span>
                          </div>
                          <div className="cardLefts">
                            <span className="text">Fiyat</span>
                            <span className="price">{flight.priceDetail.basePrice.amount} <span style={{ color: '#aaa' }}>{flight.priceDetail.basePrice.currency}</span></span>
                            <div className="choose">
                              <button onClick={() => handleFlightSelect(flight)}>Seç</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default UcakBileti;