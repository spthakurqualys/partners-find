<script>
    import { filterBy } from "../stores";
    export let selectOptions, countryOptions, partnerTypes;
    
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        if(value && name === "region"){
            $filterBy.countryId = "";
        }else{
            $filterBy.regionId = "";
        }
    }
</script>

<div class="q-square">
    <div class="q-square__inner">
        <div class="q-square__content">
            <select
                name="region"
                class="q-form__select"
                bind:value={$filterBy.regionId}
                on:change={(e) => handleChange(e)}
            >
                <option value="">Region</option>
                {#each selectOptions as option (option.key)}
                    <option value={option.value}>{option.name}</option>
                {/each}
            </select>
            <select
                name="country"
                class="q-form__select"
                bind:value={$filterBy.countryId}
                on:change={(e) => handleChange(e)}
            >
                <option value="">Country</option>
                {#each countryOptions as option (option.key)}
                    <option value={option.value}>{option.name}</option>
                {/each}
            </select>

            <label for="type">Partner types:</label>
            <div class="type">
                {#each partnerTypes as type (type.value)}
                    <div class="type-container">
                        <input
                            name="type"
                            value={type.value}
                            id={type.value}
                            type="checkbox"
                            bind:group={$filterBy.types}
                        />
                        <label for={type.value}
                            ><abbr title={type.title}>{type.abbr}</abbr
                            >{#if type.value == "isMsp"}{" "}Partner{/if}</label
                        >
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
