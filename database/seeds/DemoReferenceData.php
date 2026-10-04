<?php

/**
 * Definition of the demo reference data: carriers, service areas, zip codes,
 * plans, benefits and the premium formula.
 *
 * Everything here is a constant or a formula, never random, so every run of the
 * seeders produces the same rows. The values are made up for the demo.
 *
 * Design rules that come from the quote engine (ClientController):
 *  - A zip code maps to one service area name PER CARRIER and the price queries
 *    match on that name alone, so every carrier uses its own names. If two
 *    carriers shared a name, each of them would list the other's plans too.
 *  - Plan names are searched with LIKE '%name%' and must follow the filter
 *    patterns "<HMO|PPO> <Metal> <x>" and "<Metal> EPO <x>". Names are unique
 *    inside a carrier, and a carrier never uses the same name in two years
 *    (some detail lookups do not filter by year).
 *  - Ages are text labels. Years other than 2021 have one row per age 0..63
 *    and "64+". 2021 groups the children as "0-14" and Presbyterian also
 *    groups ages 21-24 as "21-24".
 */
class DemoReferenceData
{
    const HISTORIC_YEAR = 2021;

    /** Federal default age curve (relative premium per age, age 21 = 1.000). */
    const AGE_CURVE = [
        0 => 0.635, 1 => 0.635, 2 => 0.635, 3 => 0.635, 4 => 0.635, 5 => 0.635, 6 => 0.635, 7 => 0.635,
        8 => 0.635, 9 => 0.635, 10 => 0.635, 11 => 0.635, 12 => 0.635, 13 => 0.635, 14 => 0.635,
        15 => 0.833, 16 => 0.859, 17 => 0.885, 18 => 0.913, 19 => 0.941, 20 => 0.970,
        21 => 1.000, 22 => 1.000, 23 => 1.000, 24 => 1.000, 25 => 1.004, 26 => 1.024, 27 => 1.048,
        28 => 1.087, 29 => 1.119, 30 => 1.135, 31 => 1.159, 32 => 1.183, 33 => 1.198, 34 => 1.214,
        35 => 1.222, 36 => 1.230, 37 => 1.238, 38 => 1.246, 39 => 1.262, 40 => 1.278, 41 => 1.302,
        42 => 1.325, 43 => 1.357, 44 => 1.397, 45 => 1.444, 46 => 1.500, 47 => 1.563, 48 => 1.635,
        49 => 1.706, 50 => 1.786, 51 => 1.865, 52 => 1.952, 53 => 2.040, 54 => 2.135, 55 => 2.230,
        56 => 2.333, 57 => 2.437, 58 => 2.548, 59 => 2.603, 60 => 2.714, 61 => 2.810, 62 => 2.873,
        63 => 2.952,
    ];

    const OLDEST_FACTOR = 3.000;

    /** Monthly premium of a 21 year old, per metal level (Bronze, Silver, Gold, Platinum). */
    const BASE_PREMIUM = ['Bronze' => 318.00, 'Silver' => 412.00, 'Gold' => 498.00, 'Platinum' => 603.00];

    const TYPE_FACTOR = ['HMO' => 1.00, 'PPO' => 1.14, 'EPO' => 1.06];

    /** Quarter label => premium factor (rates step up a little each quarter). */
    const QUARTERS = ['1st' => 1.000, '2nd' => 1.007, '3rd' => 1.014, '4th' => 1.021];

    const METALS = ['Bronze', 'Silver', 'Gold', 'Platinum'];

    /** The years the demo has data for: the current year and 2021. */
    public static function years()
    {
        return array_values(array_unique([(int) date('Y'), self::HISTORIC_YEAR]));
    }

    /**
     * The four carriers, in the order they are stored.
     *
     * `areas` are the three service-area names of the carrier, in the same order
     * as the area groups of zips(). `plans` are the four products it sells each
     * year as [type, metal]; the letter of the name is added per year.
     */
    public static function carriers()
    {
        return [
            'BCBS' => [
                'logo' => 'bcbs.png',
                'price_factor' => 1.000,
                'areas' => ['Bernalillo', 'Sandoval', 'Valencia'],
                'plans' => [['HMO', 'Bronze'], ['PPO', 'Silver'], ['HMO', 'Gold'], ['PPO', 'Platinum']],
            ],
            'Friday' => [
                'logo' => 'friday.png',
                'price_factor' => 0.930,
                'areas' => ['Region 1 - Bernalillo', 'Region 2 - Sandoval', 'Region 3 - Valencia'],
                'plans' => [['HMO', 'Bronze'], ['HMO', 'Silver'], ['EPO', 'Gold'], ['EPO', 'Platinum']],
            ],
            'Presbyterian' => [
                'logo' => 'presbyterian.png',
                'price_factor' => 0.965,
                'areas' => ['Albuquerque Metro', 'Rio Rancho', 'Los Lunas'],
                'plans' => [['HMO', 'Silver'], ['HMO', 'Gold'], ['PPO', 'Gold'], ['PPO', 'Bronze']],
            ],
            'THNM' => [
                'logo' => 'truehealth.png',
                'price_factor' => 1.045,
                'areas' => ['Bernalillo County', 'Sandoval County', 'Valencia County'],
                'plans' => [['HMO', 'Bronze'], ['HMO', 'Silver'], ['PPO', 'Gold'], ['EPO', 'Platinum']],
            ],
        ];
    }

    /** Premium factor of each service area, in the order of the carrier `areas`. */
    public static function areaFactors()
    {
        return [1.000, 1.045, 0.975];
    }

    /**
     * Zip codes as [zip, area index, carriers that do not serve it]. The area
     * groups are Bernalillo County, Sandoval County and Valencia County; the
     * assignment is only illustrative. 87068 is not served by two carriers.
     */
    public static function zips()
    {
        $zips = [];
        foreach ([87102, 87104, 87105, 87106, 87107, 87108, 87109, 87110, 87111, 87112, 87113, 87114, 87120, 87121, 87122, 87123] as $zip) {
            $zips[] = [$zip, 0, []];
        }
        foreach ([87004, 87043, 87048, 87124, 87144] as $zip) {
            $zips[] = [$zip, 1, []];
        }
        foreach ([87002, 87031] as $zip) {
            $zips[] = [$zip, 2, []];
        }
        $zips[] = [87068, 2, ['Friday', 'THNM']];

        return $zips;
    }

    /**
     * The four plans a carrier sells in a year as [name, type, metal, slot].
     * The current year uses the letters A-D, 2021 uses E-H, so no name is
     * ever reused by the same carrier.
     */
    public static function plans($carrier, $year)
    {
        $letters = $year === self::HISTORIC_YEAR ? ['E', 'F', 'G', 'H'] : ['A', 'B', 'C', 'D'];
        $plans = [];
        foreach (self::carriers()[$carrier]['plans'] as $slot => $plan) {
            list($type, $metal) = $plan;
            $name = $type === 'EPO' ? $metal . ' EPO ' . $letters[$slot] : $type . ' ' . $metal . ' ' . $letters[$slot];
            $plans[] = [$name, $type, $metal, $slot];
        }

        return $plans;
    }

    /** The age labels a carrier has prices for in a year. */
    public static function ageLabels($carrier, $year)
    {
        $labels = [];
        if ($year === self::HISTORIC_YEAR) {
            $labels[] = '0-14';
            for ($age = 15; $age <= 63; $age++) {
                if ($carrier === 'Presbyterian' && $age >= 21 && $age <= 24) {
                    if ($age === 21) {
                        $labels[] = '21-24';
                    }
                    continue;
                }
                $labels[] = (string) $age;
            }
        } else {
            for ($age = 0; $age <= 63; $age++) {
                $labels[] = (string) $age;
            }
        }
        $labels[] = '64+';

        return $labels;
    }

    /** Relative premium of an age label. */
    public static function ageFactor($label)
    {
        if ($label === '64+') {
            return self::OLDEST_FACTOR;
        }
        if ($label === '0-14') {
            return self::AGE_CURVE[0];
        }
        if ($label === '21-24') {
            return self::AGE_CURVE[21];
        }

        return self::AGE_CURVE[(int) $label];
    }

    /** Monthly premium in dollars for one plan, area, quarter and age label. */
    public static function premium($carrier, $year, $type, $metal, $slot, $areaIndex, $quarter, $ageLabel)
    {
        $yearFactor = $year === self::HISTORIC_YEAR ? 0.74 : 1.00;
        $value = self::BASE_PREMIUM[$metal]
            * self::carriers()[$carrier]['price_factor']
            * self::TYPE_FACTOR[$type]
            * self::areaFactors()[$areaIndex]
            * self::QUARTERS[$quarter]
            * $yearFactor
            * (1 + 0.012 * $slot)
            * self::ageFactor($ageLabel);

        return round($value, 2);
    }

    /** Timestamp stored on reference rows (fixed, so the data does not change between runs). */
    public static function stamp($year)
    {
        return $year . '-01-01 00:00:00';
    }

    /**
     * Benefit columns of plan_details for one plan. Better metal levels have a
     * lower deductible and lower copays; each carrier is a little different.
     */
    public static function benefits($carrier, $year, $type, $metal)
    {
        $level = array_search($metal, self::METALS);
        $carrierIndex = array_search($carrier, array_keys(self::carriers()));
        $step = $carrierIndex * 250;
        $scale = $year === self::HISTORIC_YEAR ? 0.9 : 1.0;
        $round = function ($amount) use ($scale) {
            return (int) (round($amount * $scale / 50) * 50);
        };

        $deductible = $round([6000, 4000, 1500, 500][$level] + $step);
        $outOfPocket = $round([8500, 8000, 6500, 4000][$level] + $step);

        return [
            'type' => $type,
            'deductible_individual_in_network' => (string) $deductible,
            'deductible_individual_out_network' => (string) ($deductible * 2),
            'deductible_family_in_network' => (string) ($deductible * 2),
            'deductible_family_out_network' => (string) ($deductible * 4),
            'out_of_pocket_max_individual_in_network' => (string) $outOfPocket,
            'out_of_pocket_max_individual_out_network' => (string) ($outOfPocket * 2),
            'out_of_pocket_max_family_in_network' => (string) ($outOfPocket * 2),
            'out_of_pocket_max_family_out_network' => (string) ($outOfPocket * 4),
            'hsa_compliant' => $level === 0 ? 'Yes' : 'No',
            'primary_care_office_visit' => (string) ([40, 30, 20, 10][$level] + $carrierIndex * 5),
            'preventive_care_services' => 'No charge',
            'specialist_care_office_visit' => (string) ([80, 60, 40, 30][$level] + $carrierIndex * 10),
            'behavioral_health_visits' => (string) ([40, 30, 20, 10][$level] + $carrierIndex * 5),
            'urgent_care' => ['100', '75', '50', '40'][$level],
            'emergency_room' => (string) ([500, 400, 300, 250][$level] + $carrierIndex * 25),
            'ct_pet_scan_mri' => ['600', '500', '350', '250'][$level],
            'x_rays' => ['80', '60', '40', '30'][$level],
            'outpatient_hospital' => ['30%', '20%', '15%', '10%'][$level],
            'inpatient_hospital' => ['40%', '30%', '20%', '10%'][$level],
            'laboratory_tests' => ['40', '30', '20', '10'][$level],
            'chiropractic_and_acupuncture' => ['Not covered', '$30', '$25', '$20'][$level],
            'rehabilitation_therapy' => ['40', '30', '20', '10'][$level],
            'tier1' => ['15', '10', '10', '5'][$level],
            'tier2' => ['30', '20', '15', '10'][$level],
            'tier3' => ['60', '50', '40', '30'][$level],
            'tier4' => ['100', '80', '60', '50'][$level],
            'tier5' => ['40%', '35%', '30%', '25%'][$level],
            'tier6' => ['50%', '45%', '40%', '30%'][$level],
        ];
    }
}
