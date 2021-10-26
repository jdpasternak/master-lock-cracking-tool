# Master Lock Combination Lock Cracking Tool
# @author Jake Pasternak

print("Master Lock Combination Lock Cracking Tool")
# Provide instrcutions for finding sticky numbers
# Prompt for sticky numbers (need 12)
#   If less than 12 provided, prompt to re-enter
# Determine 3rd number
#   all whole numbers, one that doesn't end in the same digit
# magic_num = (3rd_num % 4) + 4
# Determine 1st number possibilities
#   while result < 40:
#       possibility = magic_num + 4
#       if ((third_num + 2) == possibility) OR ((third_num -2) == possibility)
#   add result to a list
# Determine 2nd number possibilities
#   if magic_num < 2:
#       magic_num += 2
#   else:
#       magic_num -= 2
#   while result < 40:
#       magic_num + 4
#        return results to a list
# parse through both lists and return list of possible combinations
#   first + "-" + second + "-" + third


temp = []
stickies = []

# Ask for sticky numbers
while len(stickies) < 12:
    stickies = '2.5, 4.5, 9, 12.5, 15.5, 19, 22.5, 25.5, 29, 32.5, 36, 39'
    # stickies = input("Enter comma separated list of sticky numbers. There should be 12: ")
    stickies = stickies.split(',')
stickies = [i.strip() for i in stickies]
print(f'stickies: {stickies}')
for sticky in stickies:
    if not '.5' in sticky:
        temp.append(sticky)
stickies = temp

# Takes a list of "sticky" numbers and returns the third number in the cominbation, an int
def gen_third_number(stickies):
    digit_counts = {}
    last_digits = [i[-1] for i in stickies]
    stickies = [int(i) for i in stickies]
    for i in last_digits:
        if not i in digit_counts.keys():
            digit_counts[i] = 1
        else:
            digit_counts[i] += 1
    for d in digit_counts:
        if digit_counts[d] == 1:
            unique = int(d)
    for i in stickies:
        if (i - unique) % 10 == 0:
            return i

def calculate_magic_number(third_number):
    return third_number % 4

def generate_first_number_possibilities(magic_number, third_number):
    first_number_possibilities = []
    working_number = magic_number
    while working_number < 40 - 4:
        working_number += 4
        if not third_number - 2 == working_number and not third_number + 2 == working_number and not third_number == working_number:
            first_number_possibilities.append(working_number)
    return first_number_possibilities

def generate_second_number_possibilities(magic_number):
    second_number_possibilities = []
    if magic_number < 2:
        working_number = magic_number + 2
    else:
        working_number = magic_number - 2
    second_number_possibilities.append(working_number)
    while working_number < 40 - 4:
        working_number += 4
        second_number_possibilities.append(working_number)
    return second_number_possibilities

def generate_combinations(first_num_possibilities, second_num_possibilities, third_number):
    count = 0
    possible_combinations = []
    for i in first_num_possibilities:
        for j in second_num_possibilities:
            print(f'{i}-{j}-{third_number}')
            possible_combinations.append(f'{i}-{j}-{third_number}')
            count += 1
    print(f'Reduced to {count} possible combinations.')
    print(f'{count} combinations could take up to {(10*count)/60:.2f} minutes to crack.')
    return possible_combinations

third_number = gen_third_number(stickies)
magic_number = calculate_magic_number(third_number)
first_number_possibilities = generate_first_number_possibilities(magic_number, third_number)
second_number_possibilities = generate_second_number_possibilities(magic_number)

print(f'Third number: {third_number}\nMagic Number: {magic_number}\nFirst Number Possibilties: {first_number_possibilities}\nSecond Number Possibilities: {second_number_possibilities}')

combinations = generate_combinations(first_number_possibilities, second_number_possibilities, third_number)

for i in combinations:
    print(i)
    input()
    