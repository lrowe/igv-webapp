/*
 *  The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 The Regents of the University of California
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var site = (function (site) {

    site.init = function ($container) {

        var options,
            config,
            browser,
            columnFormat,
            encodeDatasource,
            loadTracks;

        options =
            {
                encodeEnabled:true,
                minimumBases: 6,
                showIdeogram: true,
                showRuler: true,
                locus: 'brca1',
                // locus: 'SLC25A3',
                // locus: 'rs28372744',
                // locus: ['egfr', 'myc', 'pten'],
                // locus: ['2', '4', '8'],
                reference:
                    {
                        id: "hg19",
                        fastaURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/1kg_v37/human_g1k_v37_decoy.fasta",
                        cytobandURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/b37/b37_cytoband.txt"
                    },
                flanking: 75000,
                search: {
                    url: "https://dev.gtexportal.org/rest/v1/reference/features/$FEATURE$",
                    resultsField: "features"
                },
                apiKey: 'AIzaSyDUUAUFpQEN4mumeMNIRWXSiTh5cPtUAD0',
                palette:
                    [
                        "#00A0B0",
                        "#6A4A3C",
                        "#CC333F",
                        "#EB6841"
                    ],
                tracks:
                    [
                        {
                            name: "Genes",
                            searchable: false,
                            type: "annotation",
                            format: "gtf",
                            sourceType: "file",
                            url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.annotation.sorted.gtf.gz",
                            indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.annotation.sorted.gtf.gz.tbi",
                            visibilityWindow: 10000000,
                            order: Number.MAX_VALUE,
                            displayMode: "EXPANDED"
                        }
                    ]
            };

        browser = igv.createBrowser($container.get(0), options);

        columnFormat =
            [
                {    'Assembly': '10%' },
                {   'Cell Type': '10%' },
                {      'Target': '10%' },
                {  'Assay Type': '20%' },
                { 'Output Type': '20%' },
                {         'Lab': '20%' }

            ];

        encodeDatasource = new igv.EncodeDataSource(columnFormat);

        loadTracks = function (configurationList) {
          browser.loadTracksWithConfigList(configurationList);
        };
        config =
            {
                $modal:$('#encodeModal'),
                $modalBody:$('#mte-modal-body'),
                $modalTopCloseButton: $('#encodeModalTopCloseButton'),
                $modalBottomCloseButton: $('#encodeModalBottomCloseButton'),
                $modalGoButton: $('#encodeModalGoButton'),
                datasource: encodeDatasource,
                browserHandler: loadTracks
            };

        browser.encodeTable = new igv.ModalTable(config);

    };

    return site;

})(site || {});