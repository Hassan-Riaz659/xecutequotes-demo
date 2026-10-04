<?php

namespace App\Services\Quote;

/**
 * Formatting of a plan card (a plan_prices row with its plan_details) for the
 * compare, print and view responses.
 *
 * The statements are the ones that were written inline in ClientController.
 * They read and write the card through the same array-style access
 * ($card['plan_details'][...]), in the same order, so a card that is an
 * Eloquent model, a plain array or has no plan_details behaves as before.
 */
class PlanDetailsFormatter
{
    /**
     * plan_details fields that get a "$" prefix when their value is numeric,
     * in the order they are processed. The print views also process 'tier6'.
     */
    const DOLLAR_FIELDS = [
        'primary_care_office_visit',
        'preventive_care_services',
        'specialist_care_office_visit',
        'behavioral_health_visits',
        'urgent_care',
        'emergency_room',
        'ct_pet_scan_mri',
        'x_rays',
        'outpatient_hospital',
        'inpatient_hospital',
        'laboratory_tests',
        'chiropractic_and_acupuncture',
        'rehabilitation_therapy',
        'tier1',
        'tier2',
        'tier3',
        'tier4',
        'tier5',
    ];

    /**
     * Whole-number display of an amount such as "1,500": thousands separators
     * are removed, the value is cast to int and formatted again.
     *
     * @param  mixed  $value
     * @return string
     */
    public static function wholeNumber($value)
    {
        $value = str_replace(',', '', $value);
        $value = (int)$value;
        $value = number_format($value);

        return $value;
    }

    /**
     * Sets the deductible and out-of-pocket maximum fields on the card
     * (deductible_in, deductible_out, family_in, family_out, max_individual_in,
     * max_individual_out, max_family_in, max_family_out) from its plan_details.
     * All values are read first, then all fields are written.
     *
     * @param  mixed  $card  The plan card, passed by reference.
     * @return void
     */
    public static function applyNetworkAmounts(&$card)
    {
        $deductible_individual_in_network = self::wholeNumber($card['plan_details']['deductible_individual_in_network']);
        $deductible_individual_out_network = self::wholeNumber($card['plan_details']['deductible_individual_out_network']);
        $deductible_family_in_network = self::wholeNumber($card['plan_details']['deductible_family_in_network']);
        $deductible_family_out_network = self::wholeNumber($card['plan_details']['deductible_family_out_network']);
        $out_of_pocket_max_individual_in_network = self::wholeNumber($card['plan_details']['out_of_pocket_max_individual_in_network']);
        $out_of_pocket_max_individual_out_network = self::wholeNumber($card['plan_details']['out_of_pocket_max_individual_out_network']);
        $out_of_pocket_max_family_in_network = self::wholeNumber($card['plan_details']['out_of_pocket_max_family_in_network']);
        $out_of_pocket_max_family_out_network = self::wholeNumber($card['plan_details']['out_of_pocket_max_family_out_network']);

        $card['deductible_in'] = $deductible_individual_in_network;
        $card['deductible_out'] = $deductible_individual_out_network;
        $card['family_in'] = $deductible_family_in_network;
        $card['family_out'] = $deductible_family_out_network;
        $card['max_individual_in'] = $out_of_pocket_max_individual_in_network;
        $card['max_individual_out'] = $out_of_pocket_max_individual_out_network;
        $card['max_family_in'] = $out_of_pocket_max_family_in_network;
        $card['max_family_out'] = $out_of_pocket_max_family_out_network;
    }

    /**
     * Applying checks on the plan_details fields: when a value is a number it
     * gets a "$" prefix, otherwise (for example a percentage or text) it is
     * left as it is.
     *
     * @param  mixed  $card          The plan card, passed by reference.
     * @param  bool   $includeTier6  The print views also check 'tier6'.
     * @return void
     */
    public static function prefixDollar(&$card, $includeTier6 = false)
    {
        $fields = self::DOLLAR_FIELDS;
        if ($includeTier6) {
            $fields[] = 'tier6';
        }

        foreach ($fields as $field) {
            if (is_numeric($card['plan_details'][$field]) == true) {
                $card['plan_details'][$field] = "$" . $card['plan_details'][$field];
            } else {
                $card['plan_details'][$field] = $card['plan_details'][$field];
            }
        }
    }

    /**
     * Metal tier of a plan name: Bronze, Silver, Gold or Platinum when the
     * name contains it (first match wins), otherwise the name unchanged.
     *
     * @param  mixed  $planName
     * @return mixed
     */
    public static function tier($planName)
    {
        if (strpos($planName, 'Bronze') !== false) {
            $planName = "Bronze";
        } elseif (strpos($planName, 'Silver') !== false) {
            $planName = "Silver";
        } elseif (strpos($planName, 'Gold') !== false) {
            $planName = "Gold";
        } elseif (strpos($planName, 'Platinum') !== false) {
            $planName = "Platinum";
        }

        return $planName;
    }
}
