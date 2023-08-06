import RenderBody from '../_Layout/RenderBody';
import React, { useEffect, useState } from 'react';
import FeaturedServices from '../Component/FeaturedServices';
import { Helmet } from 'react-helmet';

const Odeme = () => {
    const pageTitle = 'PinSoft | Ödeme';
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <RenderBody>
                <main>
                    <section className="flight-information">

                        <div className="info">
                            <h1>Ödeme Bilgileri</h1>
                            <p style={{ color: '#fff' }}>Ödemenizi güvenli bir şekilde yapın ve uçuşa hazır olun! </p>
                        </div>
                        <div className="user-flight-info">
                            <div className="user-info">


                                <div className="flight-price">

                                    <div className="cart-info">
                                        <ul>
                                            <li><div className="buttons">Kredi Kartı / Banka Kartı</div></li>
                                            <li><div className="buttons">Kolay Havale</div></li>
                                            <li><div className="buttons">Papara</div></li>
                                        </ul>
                                    </div>
                                    <div className="cart-info" style={{ display: 'block' }}>
                                        <input type="number" placeholder="Kart  Numarası" />
                                    </div>
                                    <div className="cart-info" style={{ display: 'block' }}>
                                        <select>
                                            <option value="">Ay</option>
                                        </select>
                                        <select>
                                            <option value="">Yıl</option>
                                        </select>
                                        <input type="number" style={{ width: '150px' }} placeholder="CVV" />
                                    </div>
                                    <div className="cart-info" style={{ display: 'block' }}>
                                        <h5>Taksit Seçenekleri</h5>
                                        <select>
                                            <option value="">Tek Çekim</option>
                                        </select>
                                    </div>
                                    <div className="cart-info" style={{ display: 'block' }}>
                                        <input type="checkbox" style={{ width: '12px', marginTop: '0', float: 'left' }} />
                                        <span style={{ fontSize: '11px', marginTop: '3px', float: 'left', marginLeft: '5px', color: '#007bff', cursor: 'pointer' }}>Kullanım koşullarını okudum ve kabul ediyorum.</span>
                                    </div>
                                    <div className="cart-info" style={{ display: 'block', height: '0' }} >
                                        <h5 style={{ float: 'left' }}>Toplam Ödenecek Tutar : <span> {formData.totalAmount} <span style={{ color: '#aaa' }}>EUR</span></span></h5>

                                    </div>
                                    <div className="flight-price">
                                        <div className="flight-price-info" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                            <div className="choose" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <button style={{ width: '200px', height: '40px' }}>Ödemeyi Tamamla</button>
                                            </div>
                                        </div>
                                    </div>
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

export default Odeme;