/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type LineSeriesOptions from '../../../Series/Line/LineSeriesOptions';
import type SMAOptions from './SMAOptions';
import BaseSeries from '../../../Core/Series/Series.js';
const {
    seriesTypes: {
        line: LineSeries,
        ohlc: {
            prototype: ohlcProto
        }
    }
} = BaseSeries;
import U from '../../../Core/Utilities.js';
const {
    addEvent,
    extend
} = U;

/* *
 *
 *  Composition
 *
 * */

addEvent(LineSeries, 'init', function (
    eventOptions: { options: SMAOptions }
): void {
    // eslint-disable-next-line no-invalid-this
    var series = this,
        options = eventOptions.options;

    if (
        options.useOhlcData &&
        options.id !== 'highcharts-navigator-series'
    ) {
        extend(series, {
            pointValKey: ohlcProto.pointValKey,
            keys: (ohlcProto as any).keys, // @todo potentially nonsense
            pointArrayMap: ohlcProto.pointArrayMap,
            toYData: ohlcProto.toYData
        });
    }
});

addEvent(LineSeries, 'afterSetOptions', function (
    e: { options: LineSeriesOptions }
): void {
    var options = e.options,
        dataGrouping = options.dataGrouping;

    if (
        dataGrouping &&
        options.useOhlcData &&
        options.id !== 'highcharts-navigator-series'
    ) {
        dataGrouping.approximation = 'ohlc';
    }
});
