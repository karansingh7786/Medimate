def suggest_slot(existing_slots):
    all_slots = ["10:00", "11:00", "12:00", "2:00", "3:00", "4:00"]

    for slot in all_slots:
        if slot not in existing_slots:
            return slot

    return "No slots available today"
