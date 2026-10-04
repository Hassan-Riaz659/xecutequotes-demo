<?php

use Carbon\Carbon;

/**
 * Definition of the demo accounts and their data: nine personas, twelve clients
 * with their census, sixteen quotes with compared plans, saved quotes and
 * assigned plans, plus the billing history.
 *
 * Nothing here is random. Every date is relative to "today" (the date the
 * database is seeded, or DEMO_TODAY when it is set), so the dashboards always
 * show recent activity and the same day always produces the same rows.
 * Effective dates are first-of-month dates kept inside the current year.
 *
 * All addresses use the reserved example.test domain; every account has the
 * password "Password123!". The names are made up.
 */
class DemoScenarioData
{
    const PASSWORD = 'Password123!';

    /** bcrypt hash of PASSWORD, fixed so the users table is identical on every run. */
    const PASSWORD_HASH = '$2y$10$Be98IgMmtZnNIvNY8Dtk1u45bIzv5RsQPyvTrAGPNBxN6DzCMkMii';

    /** File name of the demo broker's company logo (generated with the other demo assets). */
    const BROKER_LOGO = 'demo-broker-logo.png';

    /** The date every relative offset is counted from. Set DEMO_TODAY=YYYY-MM-DD to pin it. */
    public static function today()
    {
        $pinned = env('DEMO_TODAY');

        return $pinned ? Carbon::parse($pinned)->startOfDay() : Carbon::today();
    }

    /** "N days ago at HH:MM:SS" as a database timestamp. */
    public static function stamp($daysAgo, $hour = 10, $minute = 0)
    {
        if ($daysAgo <= 0) {
            // Something created "today" is stamped just after midnight, so it is never later than the moment the database is seeded.
            $hour = 0;
            $minute = 1;
        }

        return self::today()->subDays($daysAgo)->setTime($hour, $minute, 0)->toDateTimeString();
    }

    /**
     * First day of the month that is $monthOffset months from today, kept inside
     * the current year (an offset past December gives December 1st).
     */
    public static function effectiveDate($monthOffset)
    {
        $today = self::today();
        $month = max(1, min(12, $today->month + $monthOffset));

        return Carbon::create($today->year, $month, 1)->toDateString();
    }

    /** The annual broker renews five months from today. */
    public static function renewalDate()
    {
        return self::today()->addMonthsNoOverflow(5)->toDateString();
    }

    /**
     * The nine personas in the order they are created (ids 1 to 9).
     * `states` are User factory states; `attributes` override the factory values.
     */
    public static function users()
    {
        $renewal = self::renewalDate();

        return [
            'admin' => [
                'name' => 'Demo Admin', 'email' => 'admin@example.test', 'created' => 730,
                'states' => ['admin'],
                'attributes' => ['phone_number' => '505-555-0100', 'company_url' => null],
            ],
            'maria' => [
                'name' => 'Maria Lopez', 'email' => 'maria.broker@example.test', 'created' => 580,
                'states' => ['annual', 'withExtraLicenses'],
                // Four licenses bought, three used by the agents below, one still free.
                'attributes' => [
                    'phone_number' => '505-555-0101', 'company_url' => 'lopezbenefits.example.test',
                    'company_logo' => self::BROKER_LOGO, 'next_charge_date' => $renewal,
                    'additional_license' => 1, 'total_additional_licenses' => 4,
                ],
            ],
            'noah' => [
                'name' => 'Noah Bennett', 'email' => 'noah.free@example.test', 'created' => 80,
                'states' => [],
                // Free broker who has used two of the three free quotes.
                'attributes' => ['phone_number' => '505-555-0102', 'company_url' => 'bennettcoverage.example.test', 'credits_left' => 1],
            ],
            'priya' => [
                'name' => 'Priya Raman', 'email' => 'priya.credits@example.test', 'created' => 100,
                'states' => ['withBoughtCredits'],
                // Used all three free quotes, then bought two packages of four credits.
                'attributes' => ['phone_number' => '505-555-0103', 'company_url' => 'ramanbenefits.example.test', 'credits_left' => 0, 'bought_credits' => 8],
            ],
            'newbie' => [
                'name' => 'Taylor Reed', 'email' => 'new.broker@example.test', 'created' => 2,
                'states' => [],
                'attributes' => ['phone_number' => '505-555-0104', 'company_url' => 'reedadvisors.example.test'],
            ],
            'lee' => [
                'name' => 'Alex Lee', 'email' => 'agent.lee@example.test', 'created' => 120,
                'states' => ['agent'],
                'attributes' => ['phone_number' => '505-555-0111', 'company_logo' => self::BROKER_LOGO],
            ],
            'kim' => [
                'name' => 'Jamie Kim', 'email' => 'agent.kim@example.test', 'created' => 90,
                'states' => ['agent'],
                'attributes' => ['phone_number' => '505-555-0112', 'company_logo' => self::BROKER_LOGO],
            ],
            'pending' => [
                'name' => 'Morgan Ellis', 'email' => 'agent.pending@example.test', 'created' => 3,
                'states' => ['pendingAgent'],
                'attributes' => ['phone_number' => '505-555-0113', 'company_logo' => self::BROKER_LOGO, 'create_password_token' => md5('demo-agent-pending')],
            ],
            'unverified' => [
                'name' => 'Jordan Blake', 'email' => 'unverified.broker@example.test', 'created' => 1,
                'states' => ['unverified'],
                'attributes' => ['phone_number' => '505-555-0105', 'company_url' => 'blakeinsurance.example.test', 'verify_code' => md5('demo-unverified-broker')],
            ],
        ];
    }

    /**
     * Payments in the order they are created. `months_ago` counts from today.
     * Amounts follow the app: $2,500 a year, $1,000 per extra license (prorated
     * to the renewal date when bought mid-term) and $100 per package of 4 credits.
     */
    public static function charges()
    {
        $renewal = self::renewalDate();
        $licensePurchase = self::today()->subMonthsNoOverflow(5)->toDateString();
        $days = Carbon::parse($licensePurchase)->diffInDays(Carbon::parse($renewal));

        return [
            // Maria: first annual payment, the renewal a year later, then four extra licenses.
            ['user' => 'maria', 'when' => self::today()->subMonthsNoOverflow(19)->setTime(11, 0, 0)->toDateTimeString(), 'amount' => '2500.00', 'next' => self::today()->subMonthsNoOverflow(7)->toDateString(), 'licenses' => 0, 'left' => 0, 'credits' => null, 'retref' => 'DEMO00000001'],
            ['user' => 'maria', 'when' => self::today()->subMonthsNoOverflow(7)->setTime(11, 0, 0)->toDateTimeString(), 'amount' => '2500.00', 'next' => $renewal, 'licenses' => 0, 'left' => 0, 'credits' => null, 'retref' => 'DEMO00000002'],
            ['user' => 'maria', 'when' => $licensePurchase . ' 14:30:00', 'amount' => number_format(4000 / 365 * $days, 2, '.', ''), 'next' => $renewal, 'licenses' => 4, 'left' => 1, 'credits' => null, 'retref' => 'DEMO00000003'],
            // Priya: two packages of four credits.
            ['user' => 'priya', 'when' => self::stamp(25, 15), 'amount' => '100.00', 'next' => null, 'licenses' => 0, 'left' => 0, 'credits' => 4, 'retref' => 'DEMO00000004'],
            ['user' => 'priya', 'when' => self::stamp(14, 16), 'amount' => '100.00', 'next' => null, 'licenses' => 0, 'left' => 0, 'credits' => 4, 'retref' => 'DEMO00000005'],
        ];
    }

    /** The agents of the annual broker as [user key, days ago added, uses a paid license]. */
    public static function agents()
    {
        return [['lee', 120], ['kim', 90], ['pending', 3]];
    }

    /**
     * The twelve clients. `census` members are [key, member type, first name,
     * last name, age, days ago deleted (optional)]; the first member of a quote
     * is always an Employee.
     */
    public static function clients()
    {
        return [
            'dental' => ['owner' => 'maria', 'name' => 'Rio Grande Dental Group', 'zip' => '87104', 'census' => [
                ['carlos', 'Employee', 'Carlos', 'Mendoza', 46], ['elena', 'Spouse', 'Elena', 'Mendoza', 44], ['lucas', 'Dependent', 'Lucas', 'Mendoza', 15],
                ['anita', 'Employee', 'Anita', 'Rao', 38], ['tom', 'Employee', 'Tom', 'Whitaker', 52], ['greg', 'Employee', 'Greg', 'Hollis', 58, 40],
            ]],
            'outfitters' => ['owner' => 'maria', 'name' => 'Sandia Mountain Outfitters', 'zip' => '87124', 'census' => [
                ['marcus', 'Employee', 'Marcus', 'Bell', 41], ['dana', 'Spouse', 'Dana', 'Bell', 39], ['ava', 'Dependent', 'Ava', 'Bell', 9],
                ['noel', 'Dependent', 'Noel', 'Bell', 6], ['iris', 'Dependent', 'Iris', 'Bell', 2],
            ]],
            'studio' => ['owner' => 'maria', 'name' => 'Adobe Architecture Studio', 'zip' => '87110', 'census' => [
                ['jordan', 'Employee', 'Jordan', 'Pike', 33], ['casey', 'Spouse', 'Casey', 'Pike', 31], ['mia', 'Employee', 'Mia', 'Torres', 27],
            ]],
            'farms' => ['owner' => 'maria', 'name' => 'Valencia Valley Farms', 'zip' => '87031', 'census' => [
                ['ben', 'Employee', 'Ben', 'Ortega', 55], ['lila', 'Spouse', 'Lila', 'Ortega', 53], ['sam', 'Employee', 'Sam', 'Ortega', 29],
                ['nora', 'Employee', 'Nora', 'Quinn', 61], ['eli', 'Employee', 'Eli', 'Chavez', 64],
            ]],
            'bakery' => ['owner' => 'maria', 'name' => 'Duke City Bakery', 'zip' => '87068', 'census' => [
                ['rosa', 'Employee', 'Rosa', 'Vigil', 36], ['hector', 'Spouse', 'Hector', 'Vigil', 38], ['isa', 'Dependent', 'Isa', 'Vigil', 4],
            ]],
            'print' => ['owner' => 'noah', 'name' => 'Zia Print Shop', 'zip' => '87108', 'census' => [
                ['walt', 'Employee', 'Walt', 'Haines', 49], ['joan', 'Spouse', 'Joan', 'Haines', 47], ['ruby', 'Dependent', 'Ruby', 'Haines', 12],
            ]],
            // No effective date on the client: the app then reads it from the quote.
            'tours' => ['owner' => 'noah', 'name' => 'Turquoise Trail Tours', 'zip' => '87123', 'no_date' => true, 'census' => [
                ['omar', 'Employee', 'Omar', 'Said', 35], ['leah', 'Employee', 'Leah', 'Park', 30],
            ]],
            'brewing' => ['owner' => 'priya', 'name' => 'Bosque Brewing Supply', 'zip' => '87105', 'census' => [
                ['hank', 'Employee', 'Hank', 'Dyer', 44], ['mara', 'Spouse', 'Mara', 'Dyer', 42], ['finn', 'Dependent', 'Finn', 'Dyer', 14], ['zoe', 'Dependent', 'Zoe', 'Dyer', 11],
            ]],
            'gallery' => ['owner' => 'priya', 'name' => 'Old Town Gallery', 'zip' => '87102', 'census' => [
                ['ines', 'Employee', 'Ines', 'Roca', 57], ['paulo', 'Spouse', 'Paulo', 'Roca', 60], ['gina', 'Employee', 'Gina', 'Lowe', 63],
            ]],
            'roofing' => ['owner' => 'priya', 'name' => 'Rio Rancho Roofing', 'zip' => '87144', 'census' => [
                ['dale', 'Employee', 'Dale', 'Wynn', 31], ['cody', 'Employee', 'Cody', 'Wynn', 28], ['tess', 'Spouse', 'Tess', 'Wynn', 29],
            ]],
            'cafe' => ['owner' => 'lee', 'name' => 'Corrales Cafe', 'zip' => '87048', 'census' => [
                ['nina', 'Employee', 'Nina', 'Salas', 40], ['joel', 'Spouse', 'Joel', 'Salas', 42], ['mateo', 'Dependent', 'Mateo', 'Salas', 7],
            ]],
            'pottery' => ['owner' => 'kim', 'name' => 'Placitas Pottery', 'zip' => '87043', 'census' => [
                ['abel', 'Employee', 'Abel', 'Cruz', 50], ['rita', 'Spouse', 'Rita', 'Cruz', 48], ['leo', 'Dependent', 'Leo', 'Cruz', 18],
            ]],
        ];
    }

    /**
     * The sixteen quotes. `created` is days ago, `eff` the effective-date month
     * offset from today, `plans` the compared plans as [carrier, product slot]
     * (slot = position in DemoReferenceData::carriers()), `assigned` the plan the
     * broker assigned. Free-credit quotes are complete and free (the app marks
     * them when a free broker calculates); annual brokers' and agents' quotes are
     * never marked complete.
     */
    public static function quotes()
    {
        $q = function ($client, $created, $eff, $nick, $census, $plans = [], $assigned = null, $saved = false, $free = false) {
            return ['client' => $client, 'created' => $created, 'eff' => $eff, 'nick' => $nick, 'census' => $census, 'plans' => $plans, 'assigned' => $assigned, 'saved' => $saved, 'free' => $free];
        };

        return [
            // Maria, annual broker
            'q1' => $q('dental', 75, -2, 'Initial quote', ['carlos', 'elena', 'lucas', 'anita', 'greg'], [['BCBS', 1], ['Friday', 1], ['THNM', 1]], ['THNM', 1], true),
            'q3' => $q('outfitters', 45, 0, 'Fall start', ['marcus', 'dana', 'ava', 'noel'], [['BCBS', 1], ['Friday', 1], ['Presbyterian', 0], ['THNM', 1]], null, true),
            'q6' => $q('farms', 30, 1, 'Open enrollment', ['ben', 'lila', 'sam', 'nora', 'eli'], [['BCBS', 3], ['Friday', 3], ['THNM', 3]], ['Friday', 3], true),
            'q2' => $q('dental', 12, 1, 'Annual renewal', ['carlos', 'elena', 'lucas', 'anita', 'tom'], [['BCBS', 2], ['Friday', 2], ['Presbyterian', 1], ['THNM', 2]], ['BCBS', 2], true),
            'q4' => $q('outfitters', 6, 2, 'Add a dependent', ['marcus', 'dana', 'ava', 'noel', 'iris']),
            'q5' => $q('studio', 1, 1, 'Quick estimate', ['jordan', 'casey', 'mia']),
            'q7' => $q('bakery', 0, 1, 'Walk-in prospect', ['rosa', 'hector', 'isa']),
            // Noah, free broker with one credit left
            'q8' => $q('print', 50, 0, 'First try', ['walt', 'joan', 'ruby'], [['BCBS', 0], ['Friday', 0], ['THNM', 0]], ['BCBS', 0], true, true),
            'q9' => $q('tours', 20, 1, 'Seasonal staff', ['omar', 'leah'], [], null, false, true),
            // Priya, free broker with bought credits
            'q10' => $q('brewing', 85, -2, 'Brewery group', ['hank', 'mara', 'finn', 'zoe'], [['BCBS', 1], ['Presbyterian', 0]], ['Presbyterian', 0], true, true),
            'q11' => $q('gallery', 60, 0, 'Gallery team', ['ines', 'paulo', 'gina'], [['BCBS', 2], ['THNM', 2]], null, false, true),
            'q12' => $q('roofing', 33, 1, 'Roofing crew', ['dale', 'cody', 'tess'], [], null, false, true),
            // Agents
            'q13' => $q('cafe', 18, 1, 'Cafe group quote', ['nina', 'joel', 'mateo'], [['BCBS', 0], ['Friday', 1], ['Presbyterian', 3]], null, true),
            'q15' => $q('pottery', 9, 1, 'Pottery studio', ['abel', 'rita', 'leo'], [['THNM', 1], ['Presbyterian', 0], ['BCBS', 1]], ['Presbyterian', 0], true),
            'q14' => $q('cafe', 4, 2, 'Second look', ['nina', 'joel', 'mateo'], [['BCBS', 2], ['Presbyterian', 1]], ['Presbyterian', 1]),
            'q16' => $q('pottery', 1, 2, 'Alternative tiers', ['abel', 'rita', 'leo']),
        ];
    }

    /** Date of birth that matches an age on the day of seeding (birthday about four months ago). */
    public static function birthDate($age)
    {
        return self::today()->subYears($age)->subDays(120)->toDateString();
    }
}
