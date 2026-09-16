import React from 'react'
import QRCode from 'qrcode.react'
import { CheckCircle, Download, Home } from 'lucide-react'

export default function Confirmation({ id, onHome }) {
  const qrValue = `${window.location.origin}?request=${id}`

  const handleDownloadQR = () => {
    const qr = document.getElementById('qrcode')
    const canvas = qr.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `qrcode-${id}.png`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        {/* Success banner */}
        <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500" />
        
        <div className="p-8 text-center space-y-6">
          {/* Icône de succès */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>

          {/* Message */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Demande reçue ! ✓
            </h2>
            <p className="text-lg text-slate-600">
              Votre demande a été enregistrée avec succès
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Référence : <span className="font-mono font-bold text-blue-600">{id}</span>
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-slate-50 p-8 rounded-xl">
            <p className="text-sm font-semibold text-slate-600 mb-4">
              📱 Partagez ce code avec votre facteur :
            </p>
            <div id="qrcode" className="flex justify-center bg-white p-4 rounded-lg inline-block mx-auto">
              <QRCode
                value={qrValue}
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#1e3a8a"
                bgColor="#ffffff"
              />
            </div>
            <button
              onClick={handleDownloadQR}
              className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              <Download size={18} />
              Télécharger le code
            </button>
          </div>

          {/* Infos */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg text-left">
            <h3 className="font-bold text-blue-900 mb-2">✓ Prochaines étapes :</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Votre facteur recevra votre demande</li>
              <li>• Nous vous confirmerons la prise en compte par email</li>
              <li>• Suivi des statuts disponibles dans votre espace</li>
              <li>• Contact direct si questions : consultez le statut avec votre référence</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-6 flex gap-4 justify-center">
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold rounded-lg transition"
            >
              <Home size={20} />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
