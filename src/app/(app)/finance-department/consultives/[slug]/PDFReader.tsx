// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { InterventionResponse } from '@/app/(app)/service-department/interventions/useInterventions'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { DynamicContent, Margins, PageSize } from 'pdfmake/interfaces'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function PDFReader(pdfData: InterventionResponse) {
  function pdfFooter(currentPage: number, pageCount: number) {
    return [
      {
        text: currentPage + '/' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 1],
      },
    ]
  }

  const docDefinition = {
    pageSize: 'A4' as PageSize,
    pageMargins: [15, 50, 15, 40] as Margins,
    watermark: {
      text: 'T&T Sistemi Brasil',
      fontSize: 20,
      color: 'red',
      opacity: 0.1,
      bold: true,
      italics: false,
    },
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            text: 'FATURA FECHADA',
            fontSize: 18,
            bold: true,
            color: 'red',
            italics: true,
            margin: [5, 2, 10, 45],
          },
          {
            text: '11/01/2023',
            fontSize: 14,
            bold: true,
            italics: true,
          },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PROGRESSIVE:', style: 'content' },
          { text: pdfData?.progressive, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PLACE:', style: 'content' },
          { text: pdfData.site.description, style: 'italic' },
          {
            text: pdfData.isOffshore === true ? 'Offshore' : 'Onshore',
            style: 'italic',
          },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'CUSTOMER:', style: 'content' },
          { text: pdfData.customer.name, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PROJECT MANAGER:', style: 'content' },
          { text: pdfData.customerProjectManager.name, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'JOB NUMBER:', style: 'content' },
          { text: pdfData.job_number, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },

      {
        alignment: 'justify',
        columns: [
          { text: 'TECHNICIAN:', style: 'content' },
          { text: pdfData.technician.name, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'DATE:', style: 'content' },
          { text: `${pdfData.initial_at} -`, style: 'italic' },
          { text: pdfData.finished_at, style: 'italic' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'OUR REFERENCE:', style: 'content' },
          { text: pdfData.intervention_number, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PURCHASE ORDER:', style: 'content' },
          { text: pdfData.purchaseOrder.description, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'CURRENCY:', style: 'content' },
          { text: pdfData.purchaseOrder.currency, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'CHANGE:', style: 'content' },
          { text: '1', style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },

      {
        style: 'hoursTable',
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            ['Descrição', 'Horas', '$/Hora', 'TOTAL PARCIAL'],
            ['Home Office', '00', 'R$ --', 'R$ -'],
            ['Hora Viagem Nacional', '00', 'R$ --', 'R$ -'],
            ['Hora Viagem Exterior', '00', 'R$ --', 'R$ -'],
            ['HN Onshore', '00', 'R$ --', 'R$ -'],
            ['HE Onshore', '00', 'R$ --', 'R$ -'],
            ['HN Exterior Onshore', '00', 'R$ --', 'R$ -'],
            ['HE Exterior Onshore', '00', 'R$ --', 'R$ -'],
            ['HN Offshore', '00', 'R$ --', 'R$ -'],
            ['HE Offshore', '00', 'R$ --', 'R$ -'],
            ['HN Exterior Offshore', '00', 'R$ --', 'R$ -'],
            ['HE Exterior Offshore', '00', 'R$ --', 'R$ -'],
          ],
        },
      },
      {
        style: 'totalTable',
        table: {
          widths: ['*', '*'],
          body: [['TOTAL:', '000']],
        },
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'VERIFICADO POR:    Michele Fognani', style: 'content' },
          { text: 'DATA: 11/03/2023', style: 'content' },
        ],
      },
    ],
    footer: pdfFooter as unknown as DynamicContent,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        italics: true,
        color: 'red',
        margin: [0, 25, 0, 50],
      },
      content: {
        fontSize: 12,
      },
      italic: {
        italics: true,
      },
      hoursTable: {
        margin: [0, 25, 0, 15],
      },
      totalTable: {
        margin: [0, 25, 0, 50],
        bold: true,
      },
    },
  }

  pdfMake.createPdf(docDefinition).open()
}
