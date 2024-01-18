import { useState } from 'react'
import getCotation from './services/GetCotation'
import { useForm } from 'react-hook-form'

function App() {

  const [fristCountry, setFristCountry] = useState('')
  const [secoundCountry, setSecoundCountry] = useState('')
  const [finalValue, setFinalValue] = useState(0)
  const [fristValue, setFristValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const countries = [
    { coin: "AED", name: "Dirham dos Emirados" },

    { coin: "AFN", name: "Afghani do Afeganistão" },

    { coin: "ALL", name: "Lek Albanês" },

    { coin: "AMD", name: "Dram Armênio" },

    { coin: "ANG", name: "Guilder das Antilhas" },

    { coin: "AOA", name: "Kwanza Angolano" },

    { coin: "ARS", name: "Peso Argentino" },

    { coin: "AUD", name: "Dólar Australiano" },

    { coin: "AZN", name: "Manat Azeri" },

    { coin: "BAM", name: "Marco Conversível" },

    { coin: "BBD", name: "Dólar de Barbados" },

    { coin: "BDT", name: "Taka de Bangladesh" },

    { coin: "BGN", name: "Lev Búlgaro" },

    { coin: "BHD", name: "Dinar do Bahrein" },

    { coin: "BIF", name: "Franco Burundinense" },

    { coin: "BND", name: "Dólar de Brunei" },

    { coin: "BOB", name: "Boliviano" },

    { coin: "BRL", name: "Real Brasileiro" },

    { coin: "BRLT", name: "Real Brasileiro Turismo" },

    { coin: "BSD", name: "Dólar das Bahamas" },

    { coin: "BTC", name: "Bitcoin" },

    { coin: "BWP", name: "Pula de Botswana" },

    { coin: "BYN", name: "Rublo Bielorrusso" },

    { coin: "BZD", name: "Dólar de Belize" },

    { coin: "CAD", name: "Dólar Canadense" },

    { coin: "CHF", name: "Franco Suíço" },

    { coin: "CHFRTS", name: "Franco Suíço" },

    { coin: "CLP", name: "Peso Chileno" },

    { coin: "CNH", name: "Yuan chinês offshore" },

    { coin: "CNY", name: "Yuan Chinês" },

    { coin: "COP", name: "Peso Colombiano" },

    { coin: "CRC", name: "Colón Costarriquenho" },

    { coin: "CUP", name: "Peso Cubano" },

    { coin: "CVE", name: "Escudo cabo-verdiano" },

    { coin: "CZK", name: "Coroa Checa" },

    { coin: "DJF", name: "Franco do Djubouti" },

    { coin: "DKK", name: "Coroa Dinamarquesa" },

    { coin: "DOGE", name: "Dogecoin" },

    { coin: "DOP", name: "Peso Dominicano" },

    { coin: "DZD", name: "Dinar Argelino" },

    { coin: "EGP", name: "Libra Egípcia" },

    { coin: "ETB", name: "Birr Etíope" },

    { coin: "ETH", name: "Ethereum" },

    { coin: "EUR", name: "Euro" },

    { coin: "FJD", name: "Dólar de Fiji" },

    { coin: "GBP", name: "Libra Esterlina" },

    { coin: "GEL", name: "Lari Georgiano" },

    { coin: "GHS", name: "Cedi Ganês" },

    { coin: "GMD", name: "Dalasi da Gâmbia" },

    { coin: "GNF", name: "Franco de Guiné" },

    { coin: "GTQ", name: "Quetzal Guatemalteco" },

    { coin: "HKD", name: "Dólar de Hong Kong" },

    { coin: "HNL", name: "Lempira Hondurenha" },

    { coin: "HRK", name: "Kuna Croata" },

    { coin: "HTG", name: "Gourde Haitiano" },

    { coin: "HUF", name: "Florim Húngaro" },

    { coin: "IDR", name: "Rupia Indonésia" },

    { coin: "ILS", name: "Novo Shekel Israelense" },

    { coin: "INR", name: "Rúpia Indiana" },

    { coin: "IQD", name: "Dinar Iraquiano" },

    { coin: "IRR", name: "Rial Iraniano" },

    { coin: "ISK", name: "Coroa Islandesa" },

    { coin: "JMD", name: "Dólar Jamaicano" },

    { coin: "JOD", name: "Dinar Jordaniano" },

    { coin: "JPY", name: "Iene Japonês" },

    { coin: "JPYRTS", name: "Iene Japonês" },

    { coin: "KES", name: "Shilling Queniano" },

    { coin: "KGS", name: "Som Quirguistanês" },

    { coin: "KHR", name: "Riel Cambojano" },

    { coin: "KMF", name: "Franco Comorense" },

    { coin: "KRW", name: "Won Sul-Coreano" },

    { coin: "KWD", name: "Dinar Kuwaitiano" },

    { coin: "KYD", name: "Dólar das Ilhas Cayman" },

    { coin: "KZT", name: "Tengue Cazaquistanês" },

    { coin: "LAK", name: "Kip Laosiano" },

    { coin: "LBP", name: "Libra Libanesa" },

    { coin: "LKR", name: "Rúpia de Sri Lanka" },

    { coin: "LSL", name: "Loti do Lesoto" },

    { coin: "LTC", name: "Litecoin" },

    { coin: "LYD", name: "Dinar Líbio" },

    { coin: "MAD", name: "Dirham Marroquino" },

    { coin: "MDL", name: "Leu Moldavo" },

    { coin: "MGA", name: "Ariary Madagascarense" },

    { coin: "MKD", name: "Denar Macedônio" },

    { coin: "MMK", name: "Kyat de Mianmar" },

    { coin: "MNT", name: "Mongolian Tugrik" },

    { coin: "MOP", name: "Pataca de Macau" },

    { coin: "MRO", name: "Ouguiya Mauritana" },

    { coin: "MUR", name: "Rúpia Mauriciana" },

    { coin: "MVR", name: "Rufiyaa Maldiva" },

    { coin: "MWK", name: "Kwacha Malauiana" },

    { coin: "MXN", name: "Peso Mexicano" },

    { coin: "MYR", name: "Ringgit Malaio" },

    { coin: "MZN", name: "Metical de Moçambique" },

    { coin: "NAD", name: "Dólar Namíbio" },

    { coin: "NGN", name: "Naira Nigeriana" },

    { coin: "NGNI", name: "Naira Nigeriana" },

    { coin: "NGNPARALLEL", name: "Naira Nigeriana" },

    { coin: "NIO", name: "Córdoba Nicaraguense" },

    { coin: "NOK", name: "Coroa Norueguesa" },

    { coin: "NPR", name: "Rúpia Nepalesa" },

    { coin: "NZD", name: "Dólar Neozelandês" },

    { coin: "OMR", name: "Rial Omanense" },

    { coin: "PAB", name: "Balboa Panamenho" },

    { coin: "PEN", name: "Sol do Peru" },

    { coin: "PGK", name: "Kina Papua-Nova Guiné" },

    { coin: "PHP", name: "Peso Filipino" },

    { coin: "PKR", name: "Rúpia Paquistanesa" },

    { coin: "PLN", name: "Zlóti Polonês" },

    { coin: "PYG", name: "Guarani Paraguaio" },

    { coin: "QAR", name: "Rial Catarense" },

    { coin: "RON", name: "Leu Romeno" },

    { coin: "RSD", name: "Dinar Sérvio" },

    { coin: "RUB", name: "Rublo Russo" },

    { coin: "RUBTOD", name: "Rublo Russo" },

    { coin: "RUBTOM", name: "Rublo Russo" },

    { coin: "RWF", name: "Franco Ruandês" },

    { coin: "SAR", name: "Riyal Saudita" },

    { coin: "SCR", name: "Rúpias de Seicheles" },

    { coin: "SDG", name: "Libra Sudanesa" },

    { coin: "SDR", name: "DSE" },

    { coin: "SEK", name: "Coroa Sueca" },

    { coin: "SGD", name: "Dólar de Cingapura" },

    { coin: "SOS", name: "Shilling Somaliano" },

    { coin: "STD", name: "Dobra São Tomé/Príncipe" },

    { coin: "SVC", name: "Colon de El Salvador" },

    { coin: "SYP", name: "Libra Síria" },

    { coin: "SZL", name: "Lilangeni Suazilandês" },

    { coin: "THB", name: "Baht Tailandês" },

    { coin: "TJS", name: "Somoni do Tajiquistão" },

    { coin: "TMT", name: "TMT" },

    { coin: "TND", name: "Dinar Tunisiano" },

    { coin: "TRY", name: "Nova Lira Turca" },

    { coin: "TTD", name: "Dólar de Trinidad" },

    { coin: "TWD", name: "Dólar Taiuanês" },

    { coin: "TZS", name: "Shilling Tanzaniano" },

    { coin: "UAH", name: "Hryvinia Ucraniana" },

    { coin: "UGX", name: "Shilling Ugandês" },

    { coin: "USD", name: "Dólar Americano" },

    { coin: "USDT", name: "Dólar Americano" },

    { coin: "UYU", name: "Peso Uruguaio" },

    { coin: "UZS", name: "Som Uzbequistanês" },

    { coin: "VEF", name: "Bolívar Venezuelano" },

    { coin: "VND", name: "Dong Vietnamita" },

    { coin: "VUV", name: "Vatu de Vanuatu" },

    { coin: "XAF", name: "Franco CFA Central" },

    { coin: "XAGG", name: "Prata" },

    { coin: "XBR", name: "Brent Spot" },

    { coin: "XCD", name: "Dólar do Caribe Oriental" },

    { coin: "XOF", name: "Franco CFA Ocidental" },

    { coin: "XPF", name: "Franco CFP" },

    { coin: "XRP", name: "XRP" },

    { coin: "YER", name: "Riyal Iemenita" },

    { coin: "ZAR", name: "Rand Sul-Africano" },

    { coin: "ZMK", name: "Kwacha Zambiana" },

    { coin: "ZWL", name: "Dólar Zimbabuense" },

    { coin: "XAU", name: "Ouro" }
  ]


  const onSubmit = async (e: any) => {
    setIsLoading(true)
    setHasError(false)
    setErrorMessage('')
    const response = await getCotation(e.from, e.to)

    switch (response.status) {
      case 200:
        const jsonKey = e.from + e.to
        const value = parseFloat((eval(`response.data.${jsonKey}.high`) * fristValue).toFixed(2))
        setFinalValue(value)
        setIsLoading(false)
        break;
      case 404:
        setFinalValue(0)
        setHasError(true)
        setErrorMessage(response.data.message)
        setIsLoading(false)
        break;
    }
  }

  const { register, handleSubmit } = useForm();

  return (
    <div className='container vh-100 d-flex flex-column align-items-center justify-content-center'>
      {isLoading && <div className="row loading-login d-flex vh-100 vw-100 justify-content-center align-items-center">
        <div className="spinner-border text-primary justify-content-center align-items-center" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>}
      <div className='p-3 w-50 box-shadow align-items-center d-flex flex-column'  style={{ maxWidth: '600px', minWidth: '350px' }}>
        <form onSubmit={handleSubmit(onSubmit)} className='justify-content-center align-items-center d-flex flex-column'>
          <div className='row text-center' style={{ maxWidth: '600px', minWidth: '250px' }}>
            <h3>Conversor de Moedas REACTJS</h3>
            <hr></hr>
            <label className='mb-3'>Selecione um pais</label>
            <div className='col'>
              <select className='form-select' {...register("from")} onChange={(e) => setFristCountry(e.target.value)}>
                <option selected>Selecione um pais</option>
                {countries.map((country, i) => {
                  return <option key={i} value={country.coin}>{country.name}</option>
                })}
              </select>
            </div>
            <div className='col'>
              <select className='form-select' {...register("to")} onChange={(e) => setSecoundCountry(e.target.value)}>
                <option selected>Selecione um pais</option>
                {countries.map((country, i) => {
                  return <option key={i} value={country.coin}>{country.name}</option>
                })}
              </select>
            </div>
          </div>
          <div className='row text-center mt-3 w-100' style={{ maxWidth: '600px', minWidth: '300px' }}>
            <div className='col'>
              <label>de <strong>{fristCountry}</strong></label>
              <input className='form-control' onChange={(e) => setFristValue(parseFloat(e.target.value))}></input>
            </div>
            <div className='col'>
              <label>para <strong>{secoundCountry}</strong></label>
              <p>{finalValue}</p>
            </div>
            {hasError && <label style={{ color: "red" }}><strong>*{errorMessage}*</strong></label>}
            <button className='mt-3 btn btn-primary'> Converter </button>
          </div>
        </form>
      </div>
    </div>
  )
}
//https://economia.awesomeapi.com.br/last/USD-BRL
//https://www.rmseguros.com.br/moedas.htm

export default App
