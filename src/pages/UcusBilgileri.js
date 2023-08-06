import React, { useState, useEffect } from 'react';
import RenderBody from '../_Layout/RenderBody';
import FeaturedServices from '../Component/FeaturedServices';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const UcusBilgileri = () => {
    const pageTitle = 'PinSoft | Uçuş Bilgileri';
    const [flightData, setFlightData] = useState([]);
    const selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
    useEffect(() => {
        if (!selectedFlight || Object.keys(selectedFlight).length === 0) {
            console.error('Seçili uçuş bilgisi bulunamadı.');
            return;
        }
        const savedFlightData = localStorage.getItem('flightData');

        if (savedFlightData) {
            const searchData = JSON.parse(savedFlightData);
            console.log('Search Data:', searchData);
            const flights = [
                {
                    departureCity: searchData.departureCity,
                    returnCity: searchData.returnCity,
                    departureDate: searchData.departureDate,
                    returnDate: searchData.returnDate,
                    passengerCount: searchData.passengerCount,
                },
            ];

            setFlightData(flights);
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
    const [isim, setIsim] = useState('');
    const [soyisim, setSoyisim] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');

    const handleIsimChange = (e) => {
        setIsim(e.target.value);
    };
    const handleSoyisimChange = (e) => {
        setSoyisim(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleTelefonChange = (e) => {
        setTelefon(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const totalAmount = formData.get("totalAmount")
        if (isim && soyisim && email && telefon) {
            const formData = {
                isim,
                soyisim,
                email,
                telefon,
                totalAmount,
              };
              localStorage.setItem('formData', JSON.stringify(formData));
            window.location.href = '/odeme-islemleri';
        } else {
            showWarningAlert();
            return;
        }
    }
    const showWarningAlert = () => {
        Swal.fire({
          icon: 'info',
          title: 'Uyarı',
          timer: 1500,
          text: 'Lütfen tüm alanları eksiksiz doldurunuz.',
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
                    <section className="flight-information">

                        <div className="info">
                            <h1>Uçuş Bilgileri</h1>
                            <p style={{ color: '#fff' }}>Bizimle uçmadan önce uçuş bilgilerinizi kontrol edin! </p>
                        </div>
                        <div className="user-flight-info">
                            {flightData.map((flight) => (
                                <div className="user-info">
                                    <div className="flight-infos">
                                        <i style={{ color: '#232b38', marginRight: '5px' }}>
                                            <FontAwesomeIcon icon={faPlaneDeparture} />
                                        </i>
                                        <span>Uçuş Lokasyonu | {flight.departureCity} - {flight.returnCity}</span>

                                    </div>
                                    <div className="cardWrap">
                                        <div className="card cardLeft" style={{ boxShadow: 'none' }}>
                                            <div className="airport-name">
                                                <img src={selectedFlight.airline} width="80px" />
                                            </div>
                                            <div className="flight-info">
                                                <span className="day">{tarihTurkceGunler(flight.departureDate)}</span>
                                                <time className="times">{formatTime(selectedFlight.depTime)}</time>
                                                <span className="location">{selectedFlight.depPort}</span>
                                            </div>
                                            <div className="divider">
                                                <span className="duration">
                                                    Süre <span style={{ fontWeight: '600', color: '#232b38' }}>{calculateDuration(selectedFlight.depTime, selectedFlight.arrTime)}</span>
                                                </span>
                                                <div className="rounded"></div>
                                                <div className="dotted"></div>
                                                <div className="plane"><i><FontAwesomeIcon icon={faPlaneDeparture} /></i></div>
                                                <div className="dotted"></div>
                                                <div className="rounded bg-orange"></div>
                                                <span style={{ marginTop: '15px', fontSize: '12px', marginLeft: '65px' }}>Direct</span>
                                            </div>
                                            <div className="flight-info">
                                                <span className="day">{tarihTurkceGunler(flight.departureDate)}</span>
                                                <time className="times">{formatTime(selectedFlight.arrTime)}</time>
                                                <span className="location">{selectedFlight.arrPort}</span>
                                            </div>
                                        </div>
                                        <div className="card" style={{ width: '100px', boxShadow: 'none' }}>
                                            <div className="cardRights">
                                                <span style={{ color: '#aaa', fontSize: '13px' }}>Kuyruk No</span><br />
                                                <span style={{ fontWeight: '600', color: '#232b38' }}>{selectedFlight.flightNo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flight-price">
                                        <div className="flight-infos" style={{ borderBottom: '1px solid #dae0e8' }}>
                                            <span style={{ fontWeight: '600', color: '#232b38' }}>Fiyat Detayı</span>
                                        </div>
                                        <div className="flight-price-info" style={{ borderBottom: '1px solid #dae0e8' }}>
                                            <div style={{ height: '60px', width: '100px', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                <span style={{ fontSize: '13px', color: '#232b38' }}>Yolcu Tipi</span><br />
                                                <span className="price" style={{ fontSize: '13px' }}>{flight.passengerCount} <span style={{ color: '#aaa' }} >Kişi</span></span>
                                            </div>

                                            <div style={{ height: '60px', width: '120px', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                <span style={{ fontSize: '13px', color: '#232b38' }}>Fiyat(Kişi)</span><br />
                                                <span className="price" style={{ fontSize: '13px' }}>{selectedFlight.amount * flight.passengerCount} <span style={{ color: '#aaa' }}>{selectedFlight.currency}</span></span>
                                            </div>

                                            <div style={{ height: '60px', width: '120px', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                <span style={{ fontSize: '13px', color: '#232b38' }}>Vergi / Harç</span><br />
                                                <span className="price" style={{ fontSize: '13px' }}>{selectedFlight.totalTax} <span style={{ color: '#aaa' }}>{selectedFlight.currency}</span></span>
                                            </div>

                                            <div style={{ height: '60px', width: '120px', textAlign: 'center', float: 'left', marginRight: '20px' }}>
                                                <span style={{ fontSize: '13px', color: '#232b38' }}>Hizmet Bederli</span><br />
                                                <span className="price" style={{ fontSize: '13px' }}>{selectedFlight.surcharge} <span style={{ color: '#aaa' }}>{selectedFlight.currency}</span></span>
                                            </div>

                                            <div style={{ height: '60px', width: '120px', textAlign: 'center', float: 'left' }}>
                                                <span style={{ fontSize: '13px', color: '#232b38' }}>Toplam</span><br />
                                                <span className="price" style={{ fontSize: '13px' }}>{selectedFlight.salesPrice * flight.passengerCount} <span style={{ color: '#aaa' }}>{selectedFlight.currency}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        {Array.from({ length: flight.passengerCount }).map((_, index) => (
                                            <div key={index}>
                                                <div className="flight-price">
                                                    <div className="flight-infos" style={{ borderBottom: '1px solid #dae0e8' }} >
                                                        <span style={{ fontWeight: '600', color: '#232b38' }}>{index + 1}.Yolcu Bilgileri</span>
                                                    </div>
                                                    <div className="flight-price-info" style={{ borderBottom: '1px solid #dae0e8' }}>
                                                        <div
                                                            style={{ height: '60px', width: '120px', textAlign: 'center', float: 'left', marginRight: '50px' }}>

                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }} >
                                                                <input type="radio"  />
                                                                <span style={{ fontSize: '13px', color: '#232b38', marginTop: '3px', cursor: 'pointer' }} >Kadın</span>
                                                                <input type="radio"  />
                                                                <span style={{ fontSize: '13px', color: '#232b38', marginTop: '3px', cursor: 'pointer' }}>Erkek</span>
                                                            </div>
                                                        </div>
                                                        <input type="hidden" name="totalAmount" value={selectedFlight.salesPrice * flight.passengerCount} />
                                                        <div
                                                            style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }} >
                                                            <input type="text" className="inputs" placeholder="İsim" 
                                                                
                                                                 />
                                                        </div>
                                                        <div
                                                            style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                            <input type="text" className="inputs" placeholder="Soyisim" 
                                                            
                                                                />
                                                        </div>

                                                        <div
                                                            style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left' }}>
                                                            <input type="number" className="inputs" placeholder="T.C kimlik no" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}


                                        <div className="flight-price">
                                            <div className="flight-infos" style={{ borderBottom: '1px solid #dae0e8' }}>
                                                <span style={{ fontWeight: '600', color: '#232b38' }}>İletişim Bilgileri</span>
                                            </div>
                                            <div className="flight-price-info" style={{ borderBottom: '1px solid #dae0e8' }}>
                                                <div
                                                    style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                    <input type="text" className="inputs" placeholder="E Posta" value={email}
                                                        onChange={handleEmailChange}
                                                         />
                                                </div>

                                                <div
                                                    style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                    <input type="text" className="inputs" placeholder="Cep Telefonu" value={telefon}
                                                        onChange={handleTelefonChange}
                                                         />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flight-price">
                                            <div className="flight-infos" style={{ borderBottom: '1px solid #dae0e8' }}>
                                                <span style={{ fontWeight: '600', color: '#232b38' }}>Fatura Bilgileri</span>
                                            </div>
                                            <div className="flight-price-info" style={{ borderBottom: '1px solid #dae0e8' }}>
                                                <div
                                                    style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                    <input type="text" className="inputs" placeholder="İsim" value={isim}
                                                        onChange={handleIsimChange}
                                                        />
                                                </div>
                                                <div
                                                    style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                    <input type="text" className="inputs" placeholder="Soyisim" value={soyisim}
                                                        onChange={handleSoyisimChange}
                                                        />
                                                </div>
                                                <div
                                                    style={{ height: '50px', width: '100px', display: 'flex', alignItems: 'center', textAlign: 'center', float: 'left', marginRight: '50px' }}>
                                                    <input type="text" className="inputs" placeholder="T.C Kimlik No" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flight-price">
                                            <div className="flight-price-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div className="choose" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                                    <button type="submit" style={{ width: '200px', height: '40px' }}>Ödeme Ekranına Geç</button>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            ))}

                        </div>
                    </section>
                    <FeaturedServices />
                </main>
            </RenderBody>
        </div>
    );
};


export default UcusBilgileri;
