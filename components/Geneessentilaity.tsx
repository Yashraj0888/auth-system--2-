'use client';
import { GeneEssentialityChart } from 'gene-essentiality-chart';
import React, { useState } from 'react'

const Geneessentilaity = () => {

      const [ensemblId, setEnsemblId] = useState("ENSG00000139618")
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState("")

  return (
    <div>
          <GeneEssentialityChart
        ensemblId={ensemblId}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  )
}

export default Geneessentilaity
