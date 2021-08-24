from random import randrange


def get_bank_accounts_values(count):
    return [randrange(1000) for i in range(count)]


def get_bank_accounts_values_test(count):
    return [453, 220, 601]


# bank_accounts, staff = map(int, input("Enter a bank accounts and staff count: ").split())
bank_accounts, staff = [3, 6]
bank_accounts_values = get_bank_accounts_values_test(bank_accounts)
total_balance = sum(bank_accounts_values)
maximum_bonuses = min(total_balance // staff, max(bank_accounts_values))

print(f'bank_accounts:\t\t\t\t{bank_accounts}')
print(f'staff:\t\t\t\t\t\t{staff}')
print()
print(f'bank_accounts_values:\t\t{bank_accounts_values}')
print(f'total_balance:\t\t\t\t{total_balance}')

if maximum_bonuses > 0:

    maximum_bonuses_count = [i for i in list(map(lambda x: x // maximum_bonuses, bank_accounts_values)) if i != 0]
    not_enough_bonuses_count = [i for i in list(map(lambda x: x % maximum_bonuses, bank_accounts_values)) if i != 0]

    total_bonuses = sum(maximum_bonuses_count)

    print(f'maximum_bonuses_count\t\t{maximum_bonuses_count}')
    print(f'not_enough_bonuses_count\t{not_enough_bonuses_count}')
    print(f'total_bonuses\t\t\t\t{total_bonuses}')
    print(f'staff: {staff} > total_bonuses: {total_bonuses} | {staff > total_bonuses}')
    print()

    if staff == total_bonuses:
        print(f'maximum_bonuses:\t\t\t{maximum_bonuses}')

    if staff > total_bonuses:
        min_not_enough = min(not_enough_bonuses_count)
        maximum_bonuses -= (min_not_enough // staff + 1) * staff

        print(f'min_not_enough:\t\t\t\t{min_not_enough}')
        print(f'maximum_bonuses:\t\t\t{maximum_bonuses}')
else:
    print(f'maximum_bonuses:\t\t\t{maximum_bonuses}')
